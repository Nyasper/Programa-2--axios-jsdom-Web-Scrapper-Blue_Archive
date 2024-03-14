import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Student from './studentEntity';

// const rutaActual = dirname(fileURLToPath(import.meta.url));
const rutaActual = __dirname;

dotenv.config({ path: `${rutaActual}/.env` });

const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5433,
	username: process.env.PG_LOCAL_USER,
	password: process.env.PG_LOCAL_PASS,
	database: process.env.PG_LOCAL_DATABASE,
	entities: [Student],
	synchronize: true,
	logging: false,
});

async function Connect() {
	try {
		await AppDataSource.initialize();
		console.log('Conectado a PostgreSql');
	} catch (error) {
		console.error('Error al intentar conectar a PostgreSql');
	}
}

export default Connect;
