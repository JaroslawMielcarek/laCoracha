import {ref, computed} from 'vue'

export function getItemStyle (name, choosen, teams, windowHeight) {
  // const height = ref(0)
  // const opacity = ref(0)
  const height = computed( () => {
    if(!choosen.value) return (windowHeight.value - 44)/(teams.value.length + 1) //return `calc((100vh - 44px)/${teams.value.length + 1})`
    if(name === choosen.value) return windowHeight.value //'100vh'
    return 0
  })
  const opacity = computed( () => h ? 1 : 0)
return height
  // return {height, opacity}
} 