<template>
  <div class='sectionHeader'>
    <h1 class='header'>Patrocinadores</h1>
  </div>
  <div class='sponsorMain' v-if="sponsors.main.length">
    <template v-for="sponsor in sponsors.main" :key="sponsor">
      <a class='sponsor'  :href="sponsor.link ? `https://${sponsor.link}` : ''">
        <img v-if="sponsor.logo" :src="getLogo(sponsor)" :alt="sponsor.name"/>
        <p v-else class="name">{{ sponsor.name }}</p>
      </a>
    </template>
  </div>
  <div class='sponsorSub' v-if="sponsors.side.length">
    <template v-for="sponsor in sponsors.side" :key="sponsor">
      <a class='sponsor'  :href="sponsor.link ? `https://${sponsor.link}` : ''">
        <img v-if="sponsor.logo" :src="getLogo(sponsor)" :alt="sponsor.name"/>
        <p v-else class="name">{{ sponsor.name }}</p>
      </a>
    </template>
  </div>
  <div class='sponsorContact'>
    <p class='center_text'>Si quieres patrocinar La Coracha</p>
    <button class='btn color' @click="sendToWhatsApp">Habla con nosotros</button>
  </div>
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

.sponsorContact{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 18px;
}

.sponsorMain,
.sponsorSub{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  grid-gap: 32px;
}
.sponsorMain{
  .sponsor {
    width: 378px;
    height: 252px;
  }
}
.sponsorSub{
  flex-direction: row;
  padding-top: 18px;
  .sponsor {
    width: 126px;
    height: 68px;
  }
}
.sponsor {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 100%;
    max-width: 100%;
    aspect-ratio: 2/3;
    object-fit: contain;
    transition: transform .5s, filter 1s ease-in-out;
    filter: grayscale(100%);
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
</style>