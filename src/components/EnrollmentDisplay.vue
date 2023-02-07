<template>
<p v-if="fetchError" class="no-data">{{ fetchError }}</p>
<p v-else-if="!list.length" class="no-data">No hay ninguna categoría de inscripción disponible en este momento</p>
<ul v-else v-for="category in list">
  <h4 class='category-name'>{{ category.name }}</h4>
  <li v-for="[gender, value] in Object.entries(category)">
    <template v-if="GENDER_LIST.includes(gender)">
      <h5 :class="['category-gender', `${gender}`]">{{ translateToSpanish(gender) }} ( {{ value.minAge }} {{ (value.maxAge !== value.minAge) ? ` - ${value.maxAge}` : null }} años )</h5>
      <progress :class="['progress-bar', `${gender}`]" :max="value.maxPlaces" :value="value.currentEnrolled"></progress>
    </template>
  </li>
</ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { sortListOfObjectsBy } from '@/services/util/object.js'
import PublicService from '@/services/public.service.js'

const GENDER_LIST = ['female', 'male']

const fetchError = ref('')
const list = ref([])

onMounted( () => {
  PublicService.getAll('Enrolled')
    .then(response => {
      list.value = sortListOfObjectsBy(response, 'maxAge', false, true)
    })
    .catch(error => {
      fetchError.value = 'Hay un problema para conectarse a la base de datos'
    })
})

function translateToSpanish (word) {
  const translation = { female: 'feminino', male: 'masculino'}
  return translation[word]
}

</script>

<style lang="scss">
@import '@/colors.scss';
ul {
  margin-bottom: 1rem;
  &:last-of-type{
    margin-bottom: 0;
  }
}

li {
  display: flex;
  flex-direction: column;
}
.category-name,
.category-gender {
  text-transform: capitalize;
}

.category-name {
  margin-bottom: 0;
}

.category-gender {
  filter: drop-shadow(0 1px 1px rgba( $black, .2));
  font-size: 1rem;
  margin-bottom: 0;
  &.female {
    color: $female;
  }
  &.male {
    color: $male;
  }
}
.progress-bar {
  border-radius: 2px;
  height: 4px;
  width: 100%;

  -webkit-box-shadow: 0 4px 6px -1px rgba( $black, .2);
  -moz-box-shadow: 0 4px 6px -1px rgba( $black, .2);
  box-shadow: 0 4px 6px -1px rgba( $black, .2);

  background-color: $white;
  /* For Chrome or Safari */
  &::-webkit-progress-bar {
    background-color: $white;
  }


  &.female {

    /* For Chrome or Safari */
  
    &::-webkit-progress-value {
        background-color: $female !important;
    }
  
    /* For Firefox */

    &::-moz-progress-bar {
        background-color: $female !important;
    }

    /* For IE10 */
  
  }
  &.male {
     /* For Chrome or Safari */
  
     &::-webkit-progress-value {
        background-color: $male !important;
    }
  
    /* For Firefox */

    &::-moz-progress-bar {
        background-color: $male !important;
    }
  }
}
</style>
