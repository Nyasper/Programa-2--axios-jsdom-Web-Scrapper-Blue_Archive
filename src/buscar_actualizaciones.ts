import searchUpdates from './func/searchUpdates';
import { scanManyCharas } from './func/scanCharaInfo';
import { insertManyStudents } from './db/postgreSQL';

export default async function buscar_actualizaciones(option?: boolean) {
	try {
		const Actualizar = await searchUpdates();
		if (option === true && Actualizar.length > 0) {
			console.log('escaneando todos los personajes...');
			const scannedCharas = await scanManyCharas(Actualizar);
			await insertManyStudents(scannedCharas);
		}
	} catch (error) {
		console.error(
			'\nSe ha producido un error en la funcion Buscar_Actualizaciones en main.js\n',
			error,
		);
	}
}

buscar_actualizaciones(true);
