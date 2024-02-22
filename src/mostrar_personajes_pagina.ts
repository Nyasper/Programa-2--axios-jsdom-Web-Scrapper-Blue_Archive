import scanCharaList from './func/scanCharaList';

export default async function Mostrar_Personajes_Pagina() {
	const charaList = await scanCharaList();
	console.log('\n Listando todos los personajes de la Pagina: \n');
	charaList.forEach((chara, i) =>
		console.log(`${i + 1} ${chara.charaName} 💗 ${chara.url}`),
	);
	process.exit(0);
}

Mostrar_Personajes_Pagina();
