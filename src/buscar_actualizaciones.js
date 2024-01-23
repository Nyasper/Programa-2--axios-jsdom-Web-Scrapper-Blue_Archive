import searchUpdates from './func/searchUpdates.js';
import scanCharaInfo from './func/scanCharaInfo.js';
import { insertOneChara } from './db/postgreSQL.js';
import { updateMenu } from './func/inquirer.js';
import { actualizarMongoDB } from './db/synchronizeDB.js';

export default async function buscar_actualizaciones() {
	try {
		const Actualizar = await searchUpdates();

		const answer = await updateMenu();

		switch (answer) {
			case 1:
				for (const charaName of Actualizar) {
					insertOneChara(await scanCharaInfo(charaName));
				}
				await actualizarMongoDB('');
				break;

			case 2:
				process.exit(0);
		}
		process.exit(0);
		//Insert in PostgreSQL
	} catch (error) {
		console.error(
			'\nSe ha producido un error en la funcion Buscar_Actualizaciones en main.js\n'
				.bgRed,
			error,
		);
	}
}
