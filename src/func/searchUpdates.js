
export default async function searchUpdates(){

  const Actualizar = []
  console.log(`\nBuscando actualizaciones de nuevos Personajes...\n\n`)
  try {

  const pageCharaList = await scanCharaList() //💗Lista de personajes en la pagina💗
  const sqliteCharaNameList = await getAllCharaNames() //💙Lista de los personajes de la Base de DAtos💙




  //Buscar Actualizaciones

  
  

  for (const pageChara of pageCharaList) {

    if (!(sqliteCharaNameList.some(charaDB => charaDB.charaName == pageChara))) {
      
      Actualizar.push(pageChara)
      
    }

  }


  
  if (Actualizar.length) {
    
    
    for (const charaActualizar of Actualizar) console.log(`💙 ${charaActualizar} 💙  https://bluearchive.wiki/wiki/${charaActualizar}\n`)
    
    console.log(`\n\n💙 ${Actualizar.length} personajes disponibles para guardar 💙\n\n`)

  } else console.log('\n💜 No hay personajes nuevos para guardar. 💜\n')


    return Actualizar

  } catch (error) {
    console.error("\nSe ha producido un error en la funcion 'searchUpdates'\n",error)
  }
}

import scanCharaList from "./scanCharaList.js"
import { getAllCharaNames } from "../db/sqlite.js"