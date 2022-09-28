<template>
  <div :class="['tooltip', { 'open': isOpen }, direction.toLowerCase()]" :key="1">
    <span class="tooltip__text">{{text}}</span>
  </div>
</template>
<script>
export default {
  name: 'CustomToolTip',
  props: {
    text: {
      type: String,
      default: 'Not provided'
    },
    duration: {
      type: Number,
      default: 4000
    },
    delay: {
      type: Number,
      default: 1000
    },
    direction: {
      type: String,
      default: 'bottom'
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    showToolTip () {
      // animation duration - 3s
      setTimeout(() => {
        this.isOpen = true
        setTimeout(() => { this.isOpen = false }, this.duration)
      }, this.delay)
    }
  },
  mounted () {
    this.showToolTip()
  }
}
</script>
<style lang="scss" scoped>
@import '@/colors.scss';

.tooltip {
  position: absolute;
  padding: 2px 4px;
  min-width: fit-content;
  border-radius: 4px;
  background-color: $blueLight;
  color: $white;
  white-space: nowrap;
  transition: 0.6s ease-in-out;
  opacity: 0;
  z-index: -1;
  &.open {
    opacity: 1;
  }
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    transform: translateX(-50%) translateY(50%) rotate(45deg);
    background-color: inherit;
    z-index: -1;
  }
  &.bottom {
    top: 110%;
      &.open {
        top: 0;
        transform: translateY(calc(-100% - 10px));
      }
      &::after {
        bottom: 0;
        left: 50%;
    }
  }
  &.right {
    left: 110%;
      &.open {
        left: 0;
        transform: translateX(calc(-100% - 10px));
      }
      &::after {
        right: 0;
        top: 50%;
        transform: translateX(50%) translateY(-50%) rotate(45deg);
    }
  }
}
</style>
