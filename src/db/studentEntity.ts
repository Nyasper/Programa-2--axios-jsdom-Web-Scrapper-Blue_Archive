import {
	PrimaryColumn,
	Entity,
	Column,
	CreateDateColumn,
	BaseEntity,
} from 'typeorm';
/*
export const Students = connection.define(
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

Students.sync();
*/

export interface ICharaFile {
	charaName: string;
	name: string;
	school: string;
	pageImageProfileUrl: string | undefined;
	pageImageFullUrl: string | undefined;
	audioUrl: string | undefined;
	files: boolean;
}

@Entity('students')
export default class Student extends BaseEntity {
	@PrimaryColumn()
	charaName: string;

	@Column()
	name: string;

	@Column()
	lastName: string;

	@Column()
	school: string;

	@Column()
	role: string;

	@Column()
	combatClass: string;

	@Column()
	weaponType: string;

	@Column({ nullable: true })
	age?: number;

	@Column({ nullable: true })
	birthday?: string;

	@Column({ nullable: true })
	height?: number;

	@Column()
	hobbies: string;

	@Column({ nullable: true })
	designer?: string;

	@Column({ nullable: true })
	illustrator?: string;

	@Column()
	voice: string;

	@Column()
	releaseDate: string;

	@Column()
	skinSet: string;

	@Column()
	pageUrl: string;

	@Column({ nullable: true })
	pageImageProfileUrl?: string;

	@Column({ nullable: true })
	pageImageFullUrl?: string;

	@Column({ nullable: true })
	audioUrl?: string;

	@Column({ default: false })
	files: boolean;

	@CreateDateColumn()
	createdAt: Date;
}
