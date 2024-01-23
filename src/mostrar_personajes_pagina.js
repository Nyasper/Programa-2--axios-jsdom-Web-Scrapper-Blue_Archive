import scanCharaList from './func/scanCharaList.js';

export default async function Mostrar_Personajes_Pagina() {
  const charaList = await scanCharaList();
  console.log('\n Listando todos los personajes de la Pagina: \n'.bgMagenta);
  charaList.forEach((chara, i) =>
    console.log(
      `${i + 1} ${chara.charaName} 💗 https://bluearchive.wiki/wiki/${chara.charaName}`
        .magenta,
    ),
  );
  process.exit(0);
}
