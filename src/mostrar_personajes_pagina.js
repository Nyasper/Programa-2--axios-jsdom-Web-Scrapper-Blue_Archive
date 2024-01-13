import scanCharaList from "./func/scanCharaList.js";


export default async function mostrar_personajes_pagina() {
  const charaList = await scanCharaList()
  console.log('\nListando todos los personajes de la Pagina:\n')
  charaList.forEach((chara, i) => console.log(`💗 ${i + 1} ${chara.charaName} 💗`))
}