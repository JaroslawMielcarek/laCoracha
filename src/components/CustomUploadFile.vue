<template>
  <div>
    <label class="uploadFile">
      <input type='file' @change="handleFileUpload" :accept="canAccept"/>
      <img src='@/assets/images/upload.svg'/>{{ !file || isEmptyObject(file) ? `UPLOAD ${text}` : file.name }}
    </label>
    <p class='extra__message'>max: {{ sizeLimit/8000 }}kb</p>
    <p v-if="error" class='error'>{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { isEmptyObject } from '@/services/util/object.js'

const emit = defineEmits(['fileChoosed'])
const props = defineProps({
  text: {type: String, default:'FILE'}, 
  file: {type: Object}, 
  sizeLimit: {type: Number, default: 200000}, 
  canAccept: {type: String, default: 'image/jpg, image/png'}
})
const error = ref('')

function handleFileUpload (event) {
  const f = event.target.files[0]
  if(f.size > props.sizeLimit) {
    error.value = 'El archivo es demasiado pesado!'
    return setTimeout(() => error.value = '', 3000)
  }
  const reader = new FileReader()
  let data = ''
  reader.readAsDataURL(f)
  reader.onload = () => {
    data = (reader.result).split(',')[1]
    emit('fileChoosed', {data: data, contentType: f.type} )
  }
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