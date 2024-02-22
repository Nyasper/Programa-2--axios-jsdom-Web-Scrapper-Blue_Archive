import pg, { Client } from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getAllCharasName } from './postgreSQL';

// const rutaActual = dirname(fileURLToPath(import.meta.url));
const rutaActual = __dirname;

dotenv.config({ path: `${rutaActual}/.env` });
let client: Client;

try {
	const localOptions = {
		host: process.env.PG_LOCAL_HOST,
		user: process.env.PG_LOCAL_USER,
		password: process.env.PG_LOCAL_PASS,
		port: process.env.PG_LOCAL_PORT,
		database: process.env.PG_LOCAL_DATABASE,
	};

	const cloudOptions = {
		connectionString: process.env.POSTGRES_URL,
	};

	client = new pg.Client(cloudOptions);

	(async () => await client.connect())();
} catch (error) {
	console.error('Error al intentar Conectarse a PostgressSQL', error);
}

export const insertIntoPostgreSQL = async (chara: any) => {
	try {
		const query = `
      INSERT INTO students (
        charaName, name, lastName, school, role, combatClass,
        weaponType, age, birthday, height, hobbies, designer,
        illustrator, voice, releaseDate, url, files
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    `;

		const values = [
			chara.charaName,
			chara.name == null ? null : chara.name,
			chara.lastName === null ? null : chara.lastName,
			chara.school === null ? null : chara.school,
			chara.role === null ? null : chara.role,
			chara.combatClass === null ? null : chara.combatClass,
			chara.weaponType === null ? null : chara.weaponType,
			chara.age === null ? null : chara.age,
			chara.birthday === null ? null : chara.birthday,
			chara.height === null ? null : chara.height,
			chara.hobbies === null ? null : chara.hobbies,
			chara.designer === null ? null : chara.designer,
			chara.illustrator === null ? null : chara.illustrator,
			chara.voice === null ? null : chara.voice,
			chara.releaseDate === null ? null : chara.releaseDate,
			chara.url === null ? null : chara.url,
			chara.files,
		];

		await client.query(query, values);
		console.log(`\n💚 ${chara.charaName} 💚\n`);
	} catch (error) {
		console.error(
			'Error al insertar datos en PostgreSQL:',
			chara.charaName,
			error,
		);
	}
};

export const getAllCharasPostgreSQL = async () => {
	const result = await client.query(
		'SELECT * FROM students ORDER BY charaname',
	);

	return result.rows;
};

export const getCharasCountBySchool = async () => {
	try {
		const query = `
    SELECT DISTINCT school,COUNT(school)AS cantidad_estudiantes FROM students 
    GROUP BY school 
    ORDER BY cantidad_estudiantes DESC
    `;
		const result = await client.query(query);

		return result.rows;
	} catch (error) {
		console.error('Error al obtener los personajes por escuelas.');
	}
};

export const getCharasTotalSkins = async () => {
	try {
		const query = `
      SELECT name,COUNT(name)AS skins FROM students
      GROUP BY name
      ORDER BY skins DESC,name ASC
    `;
		const result = await client.query(query);

		return result.rows;
	} catch (error) {
		console.error('Error al obtener las skins totales de los personajes');
	}
};

export const getCharasWhitoutSkins = async () => {
	try {
		const query = `
      SELECT name,COUNT(name)AS skins FROM students
      GROUP BY name
      HAVING COUNT(name) = 1
      ORDER BY skins DESC,name ASC
    `;
		const result = await client.query(query);

		return result.rows;
	} catch (error) {
		console.error('Error al obtener los personajes sin skins.');
	}
};

export const getSetsSkins = async () => {
	try {
		const query = `
      SELECT skin_set as skin_set_name,COUNT(skin_set) as skin_set_count FROM (
      SELECT
      CASE 
      WHEN POSITION('_' IN (select REPLACE(REPLACE(LOWER(TRIM(charaname)), '(', ''), ')', ''))) > 0
      THEN SUBSTRING((select REPLACE(REPLACE(LOWER(TRIM(charaname)), '(', ''), ')', '')) FROM POSITION('_' IN charaname) + 1)
      ELSE NULL
      END AS skin_set
      FROM 
      students
      ) AS subquery
      WHERE skin_set IS NOT NULL AND skin_set NOT IN ('mikoto', 'miku', 'misaki', 'ruiko')
      GROUP BY skin_set
      ORDER BY skin_set_count DESC,skin_set_name;
    `;
		const result = await client.query(query);

		return result.rows;
	} catch (error) {
		console.error('Error al obtener los sets de  skins de los personajes');
	}
};

(async () => {
	const students = await getAllCharasName();
	if (students) {
		console.log(students);
		students.forEach((e: any) => console.log(`\n${e.charaName}`));
	}
})();

export const desconectarPostgreSQL = async () => await client.end();
