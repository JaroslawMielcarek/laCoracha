<template>
  <div class='team__logo-container'>
      <img class='team__logo' :src="getSrc()" alt='logo of team'/>
      <button class='btn danger' @click="this.$emit('removeLogo')">x</button>
    </div>
</template>

<script>
  export default{
    props: {
      image: Object
    },
    methods: {
      getSrc() {
        if(!(this.image instanceof File) ) {
          if( !this.image.contentType || !this.image.data) return ''
          return `data:image/${this.image.contentType || ''};base64,${this.image.data.toString('base64') || ''}`
        }
        return URL.createObjectURL(this.image)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '@/colors.scss';


.team__logo-container {
  position: relative;
  max-width: 64px;
  // height: 64px;

  .btn {
    position: absolute;
    top: 0px;
    right: -12px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding: 2px;
  }
}
.team__logo{
    max-width: 64px;
    // max-height: 64px;
    overflow: hidden;
    margin: 0;
    // clip-path: circle(32px at center);
    border: 1px dashed rgba($blueDark, .2);
  }
</style>