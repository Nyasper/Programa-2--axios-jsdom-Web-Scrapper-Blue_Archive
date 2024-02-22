import scanCharaList from './scanCharaList';
import { charaList } from './scanCharaList.js';
import { getAllCharasName } from '../db/postgreSQL';
import { searchDifferences } from './utils';

export default async function searchUpdates(): Promise<charaList[]> {
	console.log(`\n Buscando actualizaciones de nuevos Personajes... \n\n`);
	try {
		const pageCharaList = await scanCharaList(); //💗Lista de personajes en la pagina💗
		const postgreSQLCharaList = await getAllCharasName();

		const Actualizar = searchDifferences(pageCharaList, postgreSQLCharaList);

		if (Actualizar.length > 0) {
			Actualizar.forEach((chara) => {
				console.log(`💙 ${chara.charaName} 💙 ${chara.url}`);
			});
			console.log(
				`\n💙 ${Actualizar.length} personajes disponibles para guardar 💙\n\n`,
			);
		} else {
			console.log('\n No hay personajes nuevos para guardar. \n');
			process.exit(0);
		}

		return Actualizar;
	} catch (error) {
		throw new Error(
			'\n Se ha producido un error en la funcion "searchUpdates"\n',
		);
	}
}

(async () => {
	console.log(await searchUpdates());
})();
