<template>
  <div v-for="(rank, index) in generate"
    class='row'
    :key='rank'>
    <label class='label__inline'> {{ index + 1 }} </label>
    <div class='radio__group'>
      <input v-for="(position) in rank.availablePos"
        v-model="rank.choosen"
        class='radioButton'
        type='radio'
        :name='index'
        :label="position"
        :value="position"
        @change="addNewChooiseRow(index, $event.target.value)"
        :key="position"
      />
    </div>
  </div>
  <div class="row">
    <button v-if="playerPref.length" class='btn white full-width' @click="reset">Reset</button>
  </div>
</template>

<script>
export default {
  name: 'PreferedPositions',
  methods: {
    addNewChooiseRow (index, value) {
      this.$store.dispatch('updateUserBasicInfo', { _id: this.user._id, preferedPositions: [...this.playerPref.slice(0, index), { choosen: value }] })
    },
    generateAvailablePositions (list) {
      return this.$store.getters.getDefaultPositions.filter(defPos => {
        return !list.some(prefPos => {
          return defPos === prefPos // return the ones with different value than choosen
        })
      })
    },
    reset () {
      this.$store.dispatch('updateUserBasicInfo', { _id: this.user._id, preferedPositions: []})
    }
  },
  computed: {
    user () { return this.$store.getters.getUser },
    playerPref () { return this.user.preferedPositions ? this.user.preferedPositions : [] },
    generate () {
      const temp = []
      const arr = this.playerPref.map(rank => {
        const tt = { availablePos: this.generateAvailablePositions(temp), choosen: rank.choosen }
        temp.push(rank.choosen)
        return tt
      })
      if (temp.length <= 4) arr.push({ availablePos: this.generateAvailablePositions(temp), choosen: '' })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
label{
  margin-right: 2ch;
}
.radio__group {
  display: inline-flex;
  background: #454857;
  padding: 4px;
  border-radius: 3px;
  box-shadow: inset 0 0 0 3px rgba(35, 33, 45, 0.3),
    0 0 0 3px rgba(185, 185, 185, 0.3);
  position: relative;
  input {
    width: auto;
    height: 100%;
    appearance: none;
    outline: none;
    cursor: pointer;
    border-radius: 2px;
    padding: 4px 8px;
    margin-right: 2ch;
    background: #454857;
    color: #bdbdbdbd;
    font-size: 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    transition: all 100ms linear;

    &:last-of-type{
      margin-right: 0;
    }
  }
  input:checked {
    background-image: linear-gradient(180deg, $blueLight, $blueDark);
    color: #fff;
    box-shadow: 0 1px 1px #0000002e;
    text-shadow: 0 1px 0px rgba($blueDark, .3);
  }
  input:before {
    content: attr(label);
    display: inline-block;
    text-align: center;
    width: 100%;
  }
}
</style>
