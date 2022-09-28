<template>
  <label class="uploadFile">
    <input type='file' @change="handleFileUpload" :accept="canAccept"/>
    <img src='@/assets/images/upload.svg'/>{{ !file || isEmptyObject(file) ? `UPLOAD ${text}` : file.name }}
  </label>
  <p v-if="error" class='error'>{{error}}</p>
</template>

<script>
import { isEmptyObject } from '@/services/util/object.js'
export default {
  emits: ['fileChoosed'],
  props: {
    text: {
      type: String,
      default: 'FILE'
    },
    file: {
      type: Object
    },
    sizeLimit: {
      type: Number,
      default: 200000
    },
    canAccept: {
      type: String,
      default: 'image/jpg, image/png'
    }
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    isEmptyObject,
    handleFileUpload (event) {
      const f = event.target.files[0]

      if(f.size > this.sizeLimit) {
        this.error = 'File is too heavy!'
        return setTimeout(() => this.error = '', 3000)
      }

      const contentType = f.type
      const reader = new FileReader()
      let data = ''
      reader.readAsDataURL(f)
      reader.onload = () => {
        data = (reader.result).split(',')[1]
        this.$emit('fileChoosed', {data: data, contentType: contentType} )
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';

.uploadFile {
  display: flex;
  max-width: 20ch;
  align-items: center;
  border: 1px dashed rgba($blueDark, .2);
  padding: .4em .8em;
  cursor: pointer;
  img {
    margin-right: 1ch;
  }
}
</style>