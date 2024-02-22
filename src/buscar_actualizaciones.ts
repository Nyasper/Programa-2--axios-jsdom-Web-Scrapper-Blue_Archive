import searchUpdates from './func/searchUpdates';
import scanCharaInfo from './func/scanCharaInfo';
import { insertOneChara } from './db/postgreSQL';
import { actualizarMongoDB } from './db/synchronizeDB';

export default async function buscar_actualizaciones() {
	try {
		const Actualizar = await searchUpdates();
		let answer = 1;
		switch (answer) {
			case 1:
				for (const charaName of Actualizar) {
					insertOneChara(await scanCharaInfo(charaName.charaName));
				}
				await actualizarMongoDB();
				break;

			case 2:
				process.exit(0);
		}
		process.exit(0);
	} catch (error) {
		console.error(
			'\nSe ha producido un error en la funcion Buscar_Actualizaciones en main.js\n',
			error,
		);
	}
}
