import { scanCharaListOnlyCharaNames } from './scanCharaList';
import type { ICharaList } from './scanCharaList.js';
import { getAllStudentsCharaNames } from '../db/postgreSQL';
import { searchCharaNamesDifferences, charaDomain } from './utils';

export default async function searchUpdates(): Promise<string[]> {
	console.log(`\n Buscando actualizaciones de nuevos Personajes... \n\n`);
	try {
		const pageCharaList = await scanCharaListOnlyCharaNames(); //💗Lista de personajes en la pagina💗
		const postgreSQLCharaList = await getAllStudentsCharaNames();

		const Actualizar = searchCharaNamesDifferences(
			pageCharaList,
			postgreSQLCharaList,
		);

		if (Actualizar.length > 0) {
			Actualizar.forEach((charaName) => {
				console.log(`💙 ${charaName} 💙 ${charaDomain(charaName)}`);
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
