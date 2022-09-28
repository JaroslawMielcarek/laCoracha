<template>
  <div class='graph'>
    <SelectInput :options="['percent', 'total']" v-model:value="graphBy"/>
    <div class='legend'>
        <div class='stat'
          v-for="ele in generateGraph.legend"
          @mouseenter="ele.value ? hovered(ele.id) : {}"
          @mouseleave="ele.value ? hovered(ele.id) : {}"
          :id="ele.name"
          :key="ele"
        >
          <p :style ="{color: ele.color}">{{ele.value}}</p>
          <label :dat-value="ele.value">{{ele.name}}</label>
        </div>
    </div>
    <svg v-if="generateGraph.elements.length" xmlns='http://www.w3.org/2000/svg'>
      <g v-for="ele in generateGraph.elements" :key="ele">
        <circle
          v-if="ele.type === 'circle'"
          @mouseenter="hovered(ele.key)"
          @mouseleave="hovered(ele.key)"
          :id="ele.id"
          :stroke="ele.stroke"
          :stroke-width="ele.strokeWidth"
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          :cx="ele.cx"
          :cy="ele.cy"
          :r="ele.r"
        />
        <path
          v-if="ele.type === 'path'"
          @mouseenter="hovered(ele.key)"
          @mouseleave="hovered(ele.key)"
          :id="ele.id"
          :stroke="ele.stroke"
          :stroke-width="ele.strokeWidth"
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          :d="ele.d"
        />
      </g>
    </svg>
  </div>
</template>
<script>
import SelectInput from '@/components/CustomSelectInput.vue'

export default {
  components: {
    SelectInput
  },
  props: {
    data: {
      type: Object,
      default () {
        return {
          attack: 80,
          recieve: 20,
          set: 10,
          block: 0,
          serve: 0
        }
      }
    }
  },
  data () {
    return {
      graphBy: 'percent'
    }
  },
  computed: {
    settings () {
      return {
        data: (this.graphBy === 'total')
          ? Object.entries(this.data).map(([key, value]) => ({ key, value: value.good + value.bad }))
          : Object.entries(this.data).map(([key, value]) => ({ key, value: value[this.graphBy] })),
        centerX: 125,
        centerY: 125,
        radius: 90
      }
    },
    generateGraph () {
      const data = this.settings.data
      const floor = 100 // Set precision to 2
      let total = 0
      let beg = 0
      let end = 0
      let count = 0
      const graph = {
        legend: [],
        elements: []
      }

      for (let i = 0; i < data.length; i++) {
        total += parseInt(data[i].value)
      }

      for (let i = 0; i < data.length; i++) {
        // percentage of the donut    item.value + 1
        let p = 0
        if (total !== 0) p = Math.round((((data[i].value) / total) * 100) * floor) / floor // data[i].value || 1 <<< to set 1degree for value == 0

        count += p

        if (i === (data.length - 1) && (count < 100)) {
          p = p + (100 - count)
        }
        end = beg + ((360 / 100) * p)

        const newElement = this.createElement(data[i], i, beg, end, { x: this.settings.centerX, y: this.settings.centerY }, this.settings.radius)
        if (newElement.legend) graph.legend.push(newElement.legend)
        if (newElement.element) graph.elements.push(newElement.element)

        beg = end // Set begining of next element as end of previous
      }
      return graph
    }
  },
  methods: {
    arcRadius (cx, cy, radius, degrees) {
      const radians = (degrees / 360) * (Math.PI * 2) // let radians = (degrees - 90) * Math.PI / 180.0;
      return { x: cx + (radius * Math.cos(radians)), y: cy + (radius * Math.sin(radians)) }
    },
    /** Toggle .selected class on id element */
    hovered (id) {
      document.getElementById(id).classList.toggle('selected')
    },
    /** Set path or circle element inside svg */
    createElement (data, i, beg, end, c, radius) {
      const color = ['#F6BB42', '#8CC152', '#3BAFDA', '#967ADC', '#DA4453']
      const strokeWidth = 50
      const decimals = 10000 // Set precision 10 - .1 / 100 - .01  / 1000 - .001
      const id = `${data.key}-graph`
      let newElement = null

      if (end !== 0 && data.value) {
        if (beg === 0 && end === 360) { // Check if circle
          newElement = {
            type: 'circle',
            key: data.key,
            id: id,
            stroke: color[i % color.length],
            strokeWidth: strokeWidth,
            cx: c.x,
            cy: c.y,
            r: radius
          }
        } else {
          const b = this.arcRadius(c.x, c.y, radius, end)
          const e = this.arcRadius(c.x, c.y, radius, beg)
          const la = (end - beg) <= 180 ? 0 : 1
          newElement = {
            type: 'path',
            key: data.key,
            id: id,
            stroke: color[i % color.length],
            strokeWidth: strokeWidth,
            d: `M ${Math.round(b.x * decimals) / decimals} ${Math.round(b.y * decimals) / decimals} A ${radius} ${radius} 0 ${la} 0 ${Math.round(e.x * decimals) / decimals} ${Math.round(e.y * decimals) / decimals}`
          }
        }
      }
      return {
        element: newElement,
        legend: {
          name: data.key,
          value: data.value,
          color: color[i % color.length],
          id: id
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/colors.scss';
  .graph{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: $grey;
    grid-area: graph;
    padding: 8px 4px;
    max-width: 360px;
    -webkit-box-shadow: inset 0px 4px 4px -4px rgba($blueDark,0.2);
    box-shadow: inset 0px 4px 4px -4px rgba($blueDark,0.2);
    svg{
      width: 250px;
      height: 250px;
      display: block;
      margin: 0 auto;

      path.selected,
      circle.selected{
        stroke-width: 60;
        //filter: drop-shadow(0 0 10px black);
      }
    }
    .select{
      margin-bottom: 1em;
      align-self: flex-end;
    }
    .legend{
      display: flex;
      flex-wrap: wrap;
      text-transform: capitalize;
      // margin: 0 2ch 10px 2ch;
      justify-content: center;
      //justify-content: space-around;
      text-transform: capitalize;
      .stat{
        text-align: center;
        margin: 0 1ch 10px 1ch;
        transition: transform .2s ease-in-out;
        label{
          color: rgba(0,0,0,.6);
        }
        p{
          margin: 0;
        }
        &.selected > *{
          transform: scale(1.2);
          font-weight: 700;
        }
      }
    }
  }
</style>
