import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const rutaActual = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${rutaActual}/.env` });

export const sequelize = new Sequelize(
	`postgres://${process.env.PG_LOCAL_USER}:${process.env.PG_LOCAL_PASS}@${process.env.PG_LOCAL_HOST}:${process.env.PG_LOCAL_PORT}/${process.env.PG_LOCAL_DATABASE}`,
	{
		logging: false,
	},
);
