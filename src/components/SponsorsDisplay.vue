<template>
  <div class='sectionHeader'>
    <h1 class='header'>Patrocinadores</h1>
  </div>
  <div class='sponsor__main row' v-if="sponsors.main.length">
    <template v-for="sponsor in sponsors.main" :key="sponsor">
      <a class='sponsor'  :href="sponsor.link ? `https://${sponsor.link}` : ''">
        <div class="logo__wrapper" v-if="sponsor.logo">
          <img :src="getLogo(sponsor)" :alt="sponsor.name"/>
          <!-- <img :src="`data:${sponsor.logo.contentType};base64,${sponsor.logo.data.toString('base64')}`" :alt="sponsor.name"/> -->
        </div>
        <p class="name">{{sponsor.name}}</p>
      </a>
    </template>
  </div>
  <div class='sponsor__sub row' v-if="sponsors.side.length">
    <template v-for="sponsor in sponsors.side" :key="sponsor">
      <a class='sponsor'  :href="sponsor.link ? `https://${sponsor.link}` : ''">
        <div class="logo__wrapper" v-if="sponsor.logo">
          <img :src="getLogo(sponsor)" :alt="sponsor.name"/>
        </div>
        <p class="name">{{sponsor.name}}</p>
      </a>
    </template>
  </div>
  <p class='center_text'><button class='btn color' @click="sendToWhatsApp">Habla con nosotros</button> si quieres patrocinar La Coracha</p>
</template>

<script>
// @ is an alias to /src
import PublicService from '@/services/public.service.js'
import {getLogo} from '@/composables/logo.js'

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      sponsorsList: []
    }
  },
  mounted () {
    this.fetchSponsors()
  },
  computed: {
    sponsors () {
      const spon = {
        main: [],
        side: []
      }
      this.sponsorsList.forEach(s => {
        if(s.isMain) return spon.main.push(s)
        spon.side.push(s)
      })
      return spon
    }
  },
  methods: {
    getLogo,
    sendToWhatsApp () { window.location.href = 'https://wa.me/393497492300' },
    fetchSponsors () {
      PublicService.getAll('Sponsors')
        .then(response => {
          this.sponsorsList = response
        })
        .catch(error => {
          console.log('FetchSponsors error', error.response)
          // ERROR alert
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/colors.scss';

.center_text{
    text-align: center;
    .btn{
        display: block;
        margin: 0 auto .5em;
    }
}

.sponsor__main,
.sponsor__sub{
  display: grid;
  justify-content: center;
  grid-gap: .5rem;
}
.sponsor__main{
  grid-template-columns: minmax(300px, 500px);
  .sponsor .logo__wrapper{
    height: 200px;
  }
}
.sponsor__sub{
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  // grid-template-columns: minmax(100px, 200px);
  .sponsor .logo__wrapper{
    max-width: 150px;
  }
}
.sponsor {
    position: relative;
    // background: black;
    padding: 1rem;
    .logo__wrapper{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 70px;
      // overflow: hidden;

      img {
        grid-area: 1 / 1/ 2 / 2;
        width: 100%;
        max-height: 100%;
        // height: 100%;
        object-fit: contain;
        transition: transform .5s, filter 1s ease-in-out;
        filter: grayscale(100%);
      }
    }
    &::befor{
      content: '';
      padding-bottom: 100%;
      display: block;
    }

    &:hover {
      img {
        filter: grayscale(0);
        transform: scale(1.1);
      }
      .name {
        opacity: 0;
      }
    }
    .name {
      margin: 0;
      padding: .5rem;
      text-decoration: none;
      font-weight: 700;
      text-align: center;
      transition: .5s ease;
      opacity: 1;
    }
  }
// .sponsor__main {
//   border-bottom: 1px solid rgba($blueDark, .2);
// }
// .sponsor__main img{
//   max-width: 50vw;
//   // height: auto;
//   // max-width: 50vw;
// }
// .sponsor__sub{
//     flex-direction: column;
//     margin: 0 10vw 5vh;
// }
@media only screen
and (min-device-width: 600px)
and (orientation: landscape){

  .sponsor__main,
  .sponsor__sub{
    grid-gap: 1rem;
  }
  .sponsor__sub{
    // grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
    .sponsor .logo__wrapper{
      max-width: 250px;
    }
  }
  .sponsor .logo__wrapper{
    height: 100px;
  }
}
</style>