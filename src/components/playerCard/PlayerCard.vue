<template>
  <div class='player' :data-position="pos">
    <div class="player__card" @click="toggleDetails">
      <div class="player__avatar">
        <img  :src="fileDirection" alt="Player avatar" />
      </div>
      <p class="player__position">{{ value.position }}</p>
    </div>
    <div class='player__details' v-if="details" >
        <div class="player__image" >
          <img :src="getPhoto(value.photo)" alt = "Player avatar" />
        </div>
        <span class="close" @click="toggleDetails" />
        <div class="details">
            <h3 class="player__name">{{ value.nick || '-' }}</h3>
            <p class="player__position">Posición:<span>{{ value.position || '-' }}</span></p>
            <p class="player__number">Numero:<span>{{ value.number || '-' }}</span></p>
            <p class="player__height">Altura:<span>{{ value.height || '-'}}</span></p>
            <p class="player__dominantHand">Mano dominante:<span>{{ value.dominantHand || '-' }}</span></p>
        </div>
        <PerformanceDonutGraph v-if="store.getters.getStatus && value.inTeamPerformance" :data="value.inTeamPerformance"/>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue'
import { useStore } from 'vuex'
import PerformanceDonutGraph from './PerformanceDonutGraph'

const emit = defineEmits(['expandHeight'])
const props = defineProps({ value: {type: Object, default: {}}, pos: {type: String, default: ''} })
const store = useStore()

const details = ref(false)

const fileDirection = props.value.isFemale ? require('@/assets/images/profileWoman.svg') : require('@/assets/images/profileMan.svg')

function toggleDetails () { details.value = !details.value }
function getPhoto(value) { 
  return value 
    ? `data:image/${value.contentType || ''};base64,${value.data.toString('base64') || ''}` 
    : (props.value.isFemale ? require('@/assets/images/player-full.png') : require('@/assets/images/player-full-body.png'))
}

watch(details, () => { emit('expandHeight', details.value)})

</script>
<style lang="scss" scoped>
@import '@/colors.scss';

.player__card{
    display: inline-flex;
    flex-direction: column;
    //width: 100%;
    //height: 100%;
    justify-content: center;
    align-items: center;
    background-color: $white;
    border-radius: 10px;
    //position: relative;
    transition: all .6s ease-in-out;
    position: relative;
    &::after{
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 0 0 20px 0 $greyDark;
        opacity: .2;
        position: absolute;
        transition: opacity .6s ease-out;
        z-index: -1;
    }
    &:hover{
        transform: scale(1.1);
        border: none;
        &::after{
            opacity: .1;
        }
    }
    img{
        margin-bottom: 4px;
    }
    .player__position{
        text-transform: uppercase;
        //font-weight: 100;
        font-size: .65em;
        color: $greyDark;
        margin-bottom: .25em;
    }
}

.player__avatar{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 64px;
    margin: 4px;
    clip-path: circle(32px at center);
    //border: 2px solid $white;
    //border-radius: 50%;
    background-color: rgba($greyLight, .3);
    //filter: drop-shadow(0 0 20px $blueDark);
    img {
        width: 48px;
        height: 48px;
    }
}
.player__details{
    color: $blueDark;
    background-color: $white;
    position: absolute;
    width: fit-content;
    min-width: 350px;
    top: 0;
    left: 0;
    z-index: 2;
    display: grid;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid rgba($blueDark, .4);
    margin-bottom: 30vh;
    //clip-path: circle(0% at 188px 88px);
    transition: clip-path .2s ease-in-out;
    box-shadow: 0 0 40px rgba($blueDark , .1);
    //filter: drop-shadow(0 0 20px rgba($greyDark, .3));
    grid-template-columns: minmax(140px, auto) 20px max-content;
    grid-template-rows: 24px repeat(2, max-content) max-content;
    grid-template-areas:  ". . close"
                            "image . details"
                            "image . details"
                            "graph graph graph";
    .player__image{
        grid-area: image;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto auto;
        width: 100px;
        height: 150px;
        img {
          width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
    }
    .details{
        grid-area: details;
        padding-right: 20px;
        .player__name{
            position: relative;
            text-align: center;
            margin-top: 0;
            &::after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 25%;
                right: 25%;
                height: 1px;
                opacity: .5;
                background-color: $greyDark;
            }
        }
        p{
            font-weight: 200;
        }
        span{
            font-weight: 700;
            margin-left: 1ch;
        }
    }
}
</style>
