<template>
  <div v-for="(rank, index) in generate"
    class='row'
    :key='rank'>
    <label> {{ index + 1 }} </label>
    <div class='radio-group'>
      <input v-for="(position) in rank.availablePos"
        v-model="rank.choosen"
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

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const user = store.getters.getUser

const playerPref = computed( () => user.preferedPositions ? user.preferedPositions : [] )
const generate = computed( () => {
  const temp = []
  const arr = playerPref.value.map(rank => {
    const tt = { availablePos: generateAvailablePositions(temp), choosen: rank.choosen }
    temp.push(rank.choosen)
    return tt
  })
  if (temp.length <= 4) arr.push({ availablePos: generateAvailablePositions(temp), choosen: '' })
  return arr
})

function addNewChooiseRow (index, value) {
  store.dispatch('updateUserBasicInfo', { _id: user._id, preferedPositions: [...playerPref.value.slice(0, index), { choosen: value }] })
}
function generateAvailablePositions (list) {
  return store.getters.getDefaultPositions.filter( defPos => !list.some(prefPos => defPos === prefPos) ) // return the ones with different value than choosen
}
function reset () { store.dispatch('updateUserBasicInfo', { _id: user._id, preferedPositions: [] }) }

</script>

<style lang="scss" scoped>
@import '@/colors.scss';
label{
  margin-right: 2ch;
}
.radio-group {
  display: inline-flex;
  background: $decorativa-neutral-dark;
  padding: 4px;
  border-radius: 4px;
  box-shadow: inset 0 0 0 3px rgba($decorativa-neutral-light, 0.3),
    0 0 0 3px rgba($decorativa-neutral-light, 0.3);
  position: relative;
  input {
    width: auto;
    height: 100%;
    appearance: none;
    outline: none;
    cursor: pointer;
    padding: 4px 8px;
    margin-right: 2ch;
    background: $decorativa-neutral-dark;
    color: $decorativa-neutral-light;
    transition: all .6s linear;

    &:last-of-type{
      margin-right: 0;
    }
  }
  input:checked {
    background-image: linear-gradient(180deg, $blueLight, $blueDark);
    color: $white;
  }
  input:before {
    content: attr(label);
    display: inline-block;
    text-align: center;
    width: 100%;
  }
}
</style>
