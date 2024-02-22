import { STRING, BOOLEAN, INTEGER, DATEONLY } from 'sequelize';
import { sequelize } from './sequelize';

export const Students = sequelize.define(
	'students',
	{
		charaname: {
			type: STRING,
			primaryKey: true,
		},
		name: {
			type: STRING,
			allowNull: false,
		},
		lastname: {
			type: STRING,
		},
		school: {
			type: STRING,
			allowNull: false,
		},
		role: {
			type: STRING,
		},
		combatclass: {
			type: STRING,
		},
		weapontype: {
			type: STRING,
		},
		age: {
			type: INTEGER,
			defaultValue: null,
		},
		birthday: {
			type: STRING,
		},
		height: {
			type: INTEGER,
			defaultValue: null,
		},
		hobbies: {
			type: STRING,
		},
		designer: {
			type: STRING,
		},
		illustrator: {
			type: STRING,
		},
		voice: {
			type: STRING,
		},
		releasedate: {
			type: DATEONLY,
		},
		skinset: {
			type: STRING,
		},
		pageurl: {
			type: STRING,
		},
		pageimageprofileurl: {
			type: STRING,
		},
		pageimagefullurl: {
			type: STRING,
		},
		audiourl: {
			type: STRING,
		},
		files: {
			type: BOOLEAN,
			defaultValue: false,
		},
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: false,
	},
);

export interface IStudent {
	charaName: string;
	name: string;
	lastName: string;
	school: string;
	role: string;
	combatClass: string;
	weaponType: string;
	age: number | null;
	birthday: string | null;
	height: number | null;
	hobbies: string;
	designer: string | null;
	illustrator: string | null;
	voice: string;
	releaseDate: string;
	skinSet: string;
	pageUrl: string;
	pageImageProfileUrl: string | null;
	pageImageFullUrl: string | null;
	audioUrl: string | null;
	files: boolean;
}

export interface ICharaFiles {
	charaName: string;
	name: string;
	school: string;
	pageImageProfileUrl: string;
	pageImageFullUrl: string;
	audioUrl: string;
	files: boolean;
}

Students.sync();
