import colors from 'colors';
import scanCharaList from './scanCharaList.js';
import { getAllCharasName } from '../db/postgreSQL.js';
export default async function searchUpdates() {
	const Actualizar = [];
	console.log(
		`\n Buscando actualizaciones de nuevos Personajes... \n\n`.bgBlue,
	);
	try {
		const pageCharaList = await scanCharaList(); //💗Lista de personajes en la pagina💗
		const postgreSQLCharaList = await getAllCharasName();

		//Buscar Actualizaciones

		for (const pageChara of pageCharaList) {
			if (
				!postgreSQLCharaList.some(
					(charaDB) => charaDB.charaName === pageChara.charaName,
				)
			) {
				Actualizar.push(pageChara.charaName);
			}
		}

		if (Actualizar.length) {
			for (const charaActualizar of Actualizar)
				console.log(
					`${charaActualizar} 💙  https://bluearchive.wiki/wiki/${charaActualizar}\n`
						.blue,
				);

			console.log(
				`\n\n💙 ${Actualizar.length} personajes disponibles para guardar 💙\n\n`
					.blue,
			);
		} else {
			console.log('\n No hay personajes nuevos para guardar. \n'.bgMagenta);
			process.exit(0);
		}

		return Actualizar;
	} catch (error) {
		console.error(
			"\n Se ha producido un error en la funcion 'searchUpdates' \n".bgRed,
			error,
		);
	}
}
