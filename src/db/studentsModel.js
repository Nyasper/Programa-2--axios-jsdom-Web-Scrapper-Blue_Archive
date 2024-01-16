export const Students = sequelize.define('students', {

  charaname: {
    type: STRING,
    primaryKey: true
  },
  name: {
    type: STRING,
    allowNull: false
  },
  lastname: {
    type: STRING
  },
  school: {
    type: STRING,
    allowNull: false
  },
  role: {
    type: STRING
  },
  combatclass: {
    type: STRING
  },
  weapontype: {
    type: STRING
  },
  age: {
    type: INTEGER,
    defaultValue: null
  },
  birthday: {
    type: STRING
  },
  height: {
    type: INTEGER,
    defaultValue: null
  },
  hobbies: {
    type: STRING
  },
  designer: {
    type: STRING
  },
  illustrator: {
    type: STRING
  },
  voice: {
    type: STRING
  },
  releasedate: {
    type: DATEONLY
  },
  skinset: {
    type: STRING
  },
  pageurl: {
    type: STRING
  },
  pageimageprofileurl: {
    type: STRING
  },
  pageimagefullurl: {
    type: STRING
  },
  audiourl: {
    type: STRING
  },
  localimageprofilesrc: {
    type: STRING
  },
  localimagefullsrc: {
    type: STRING
  },
  localaudiosrc: {
    type: STRING
  },
  files: {
    type: BOOLEAN,
    defaultValue: false
  }


},
  {
    timestamps: true,
    createdAt: true,
    updatedAt: false
  }

)

/*
console.log('\nSincronizando tabla Students...\n')
*/
await Students.sync();

import { STRING, BOOLEAN, INTEGER, DATEONLY } from 'sequelize';
import { sequelize } from '../db/sequelize.js';