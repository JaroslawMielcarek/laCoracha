
// export function getLogo(object){

//   if (!object.logo || !object.logo.data || !object.logo.contentType) return require('@/assets/images/teams/default.svg')
//   return `data:${object.logo.contentType};base64,${object.logo.data.toString('base64')}`
// }

export function getLogo(object){
  if (!object.logo || !object.logo.data || !object.logo.contentType) return require('@/assets/images/teams/default.svg')
  return `data:${object.logo.contentType};base64,${object.logo.data}`
}