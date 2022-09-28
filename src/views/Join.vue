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
      <div class='option'>
        <input v-model="level" value='Nunca jugó' type='radio' id='novice' name='level'/>
        <label :class="['btn', checkIfSelected('Nunca jugó', level)? 'color' : 'white']" for='novice'>Nunca jugó</label>
      </div>
      <div class='option'>
        <input v-model="level" value='Jugó un poco' type='radio' id='amature' name='level'/>
        <label :class="['btn', checkIfSelected('Jugó un poco', level)? 'color' : 'white']" for='amature'>Jugó un poco</label>
      </div>
      <div class='option'>
        <input v-model="level" value='Se como jugar' type='radio' id='played' name='level' />
        <label :class="['btn', checkIfSelected('Se como jugar', level)? 'color' : 'white']" for='played'>Se como jugar</label>
      </div>
    </fieldset>
     <fieldset class='inline-group row'>
      <legend><p class='extra__message'>Edad</p></legend>
      <div class='option'>
        <input v-model="age" value='less than 16' type='radio' id='16' name='age'/>
        <label :class="['btn', checkIfSelected('less than 16', age)? 'color' : 'white']" for='16'> &lt; 16</label>
      </div>
      <div class='option'>
        <input v-model="age" value='16-18' type='radio' id='16-18' name='age'/>
        <label :class="['btn', checkIfSelected('16-18', age)? 'color' : 'white']" for='16-18'>16 - 18</label>
      </div>
      <div class='option'>
        <input v-model="age" value='18-20' type='radio' id='18-20' name='age'/>
        <label :class="['btn', checkIfSelected('18-20', age)? 'color' : 'white']" for='18-20'>18 - 20</label>
      </div>
      <div class='option'>
        <input v-model="age" value='more than 20' type='radio' id='20' name='age' />
        <label :class="['btn', checkIfSelected('more than 20', age)? 'color' : 'white']" for='20'>&gt; 20</label>
      </div>
    </fieldset>
    <button class='submit btn color full-width' type='submit'>Unirse</button>
  <p v-for='err in error ' class='error' :key="err">{{err}}</p>
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
    checkIfSelected (value, choosed) { return choosed === value },
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
        console.log('text', text)
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
  width: clamp(300px, 90vw, 450px);
  padding: 1em 1em 2em;
}
.inline-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.option {
  position: relative;
  flex-shrink: 0;
  // width: 30%;
  input {
    // width: 100%;
    // height: 100%;
    position: absolute;
    opacity: 0;
    // border: 1px solid black;
    // z-index: 1;
  }
  label {
    font-size: clamp(0.6rem, 1rem, 1.2rem)
  }
}
.submit {
  margin-top: 20px;
}
</style>
