<template>
  <form class='wrapper' @submit.prevent="sendMessage">
    <h3 class='title'>Consulta de nuevo jugador</h3>
    <div class='row'>
      <p class='extra__message'>Nombre y apellidos</p>
      <CustomInput
          type='text'
          pattern="^[A-Za-z][A-Za-z]{2,29}$"
          placeholder='Antonio'
          hint="Only alfabet leters allowed. min 3 char"
          v-model:value='name'
          key="name"/>
    </div>
    <fieldset class='inline-group row'>
      <legend><p class='extra__message'>Nivel</p></legend>
      <label :class="['btn', checkIfSelected('Nunca jugó', level)]">
        <input v-model="level" value='Nunca jugó' type='radio' name='level' />
        Nunca jugó
      </label>
      <label :class="['btn', checkIfSelected('Jugó un poco', level)]">
        <input v-model="level" value='Jugó un poco' type='radio' name='level' />
        Jugó un poco
      </label>
      <label :class="['btn', checkIfSelected('Se como jugar', level)]">
        <input v-model="level" value='Se como jugar' type='radio' name='level' />
        Se como jugar
      </label>
    </fieldset>
     <fieldset class='inline-group row'>
      <legend><p class='extra__message'>Edad</p></legend>
      <label :class="['btn', checkIfSelected('menos que 16', age)]">
        <input v-model="age" value='menos que 16' type='radio' name='age' />
        &lt; 16
      </label>
      <label :class="['btn', checkIfSelected('16 - 18', age)]">
        <input v-model="age" value='16 - 18' type='radio' name='age' />
        16 - 18
      </label>
      <label :class="['btn', checkIfSelected('más que 20', age)]">
        <input v-model="age" value='más que 20' type='radio' name='age' />
        &gt; 20
      </label>
    </fieldset>
    <p v-for='err in error ' class='error' :key="err">{{err}}</p>
    <button class='submit btn color full-width' type='submit'>Unirse</button>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue'

export default {
  components: {
    CustomInput
  },
  data () {
    return {
      error: [],
      name: '',
      level: '',
      age: '',
      fromUrl: ''
    }
  },
  methods: {
    checkIfSelected (value, choosed) { return choosed === value ? 'color' : 'white' },
    checkForm () {
      this.error = []

      if (!this.name) this.error.push('Nombre requerido')
      if (!this.level) this.error.push('Elige tu nivel')
      if (!this.age) this.error.push('Edad requerida')

      return !this.error.length
    },
    clearForm () {
      this.name = ''
      this.level = ''
      this.age = ''
    },
    sendMessage () {
      if (this.checkForm()) {
        const message = 'name quiere unirse al club. level y tiene age años.'
        let text = message

        const mapObj = {
          name: this.name[0].toUpperCase() + this.name.slice(1),
          level: this.level,
          age: this.age
        }
        text = text.replace(
          /name|level|age/gi,
          function (matched) {
            return mapObj[matched]
          }
        )
        window.location.href = `https://wa.me/393497492300?text=${text}`
        this.clearForm()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/colors.scss';
.wrapper {
  width: clamp(300px, 90vw, 380px);
  padding: 1em 1em 2em;
}
.inline-group {
  display: flex;
  column-gap: 10px;
  margin-bottom: 10px;
}
.btn {
  flex-shrink: 0;
  input {
    display: none;
  }
}
.submit {
  margin-top: 20px;
}
</style>
