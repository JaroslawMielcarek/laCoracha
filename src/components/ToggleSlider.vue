<template>
  <label :class="['toggleButton', { checked: checked }]" @click="() => this.$emit('toggled')" >
    <div>
      <svg viewBox="0 0 44 44">
          <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
      </svg>
    </div>
  </label>
</template>

<script>
export default {
  name: 'ToggleSlider',
  emits: ['toggled'],
  data () {
    return {
    }
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.toggleButton {
  cursor: pointer;
  display: inline-block;
  margin-right: 1ch;
  // transform: scale( .5 ); // lazy way to make it smaller
  // transform-origin: 50% 50%;
  // transform-style: preserve-3d;
  // transition: transform .14s ease;
  &:active {
    transform: rotateX(30deg);
  }
  & div {
    border: 1px solid rgba($dangerous, .2);
    border-radius: 50%;
    position: relative;
    width: 22px; //44
    height: 22px; //44
    svg {
      fill: none;
      stroke-width: 3px;
      stroke: $dangerous;
      stroke-linecap: round;
      stroke-linejoin: round;
      width: 22px; //44
      height: 22px; //44
      display: block;
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      z-index: 1;
      stroke-dashoffset: 162.6 - 38;
      stroke-dasharray: 0 162.6 133 (162.6 - 133);
      transition: all .4s ease 0s;
    }
    &:before,
    &:after {
      content: '';
      width: 1px; //3
      height: 11px; //16
      background: $dangerous;
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 5px;
    }
    &:before {
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(45deg);
      animation: bounceInBefore .3s linear forwards .3s;
    }
    &:after {
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
      animation: bounceInAfter .3s linear forwards .3s;
    }
  }
  &.checked div {
    border: 1px solid rgba($valid, .2);
    svg {
      stroke: $valid;
      stroke-dashoffset: 162.6;
      stroke-dasharray: 0 162.6 28 (162.6 - 28);
      transition: all .4s ease .2s;
    }
    &:before,
    &:after {
      background: $valid;
    }

    &:before {
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(45deg);
      animation: bounceInBeforeDont .3s linear forwards 0s;
    }
    &:after {
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
      animation: bounceInAfterDont .3s linear forwards 0s;
    }
  }
}

@keyframes bounceInBefore {
  0% {
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(45deg);
  }
  50%{
      opacity: 0.9;
      transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
  }
  80%{
      opacity: 1;
      transform: scale(.89) translate(-50%, -50%) rotate(45deg);
  }
  100%{
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
}

@keyframes bounceInAfter {
  0% {
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
  }
  50%{
      opacity: 0.9;
      transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
  }
  80%{
      opacity: 1;
      transform: scale(.89) translate(-50%, -50%) rotate(-45deg);
  }
  100%{
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
}

@keyframes bounceInBeforeDont {
  0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
  100%{
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(45deg);
  }
}

@keyframes bounceInAfterDont {
  0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(-45deg);
  }
  100%{
      opacity: 0;
      transform: scale(.3) translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
