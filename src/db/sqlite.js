import Database from 'better-sqlite3';

const options = {
  readonly: false,
  fileMustExist: true, // if the database does not exist, an Error will be thrown instead of creating a new file.
  timeout: 5000, //the number of milliseconds to wait when executing queries on a locked database, before throwing a SQLITE_BUSY error (default: 5000).
  verbose: null //provide a function that gets called with every SQL string executed by the database connection (default: null).
}


const rutaActual = dirname(fileURLToPath(import.meta.url));


export const db = new Database(join(rutaActual, 'BlueArchiveDB.sqlite'), options);
db.pragma('cache_size = 32000');



export const getAllCharaNames = async () => {

  try {

    const query = db.prepare('SELECT charaName FROM students ORDER BY charaName')
    const row = query.all();
    return row

  } catch (error) {
    console.error('Error al Ejecutar Consulta de Sqlite.', error)
  }

}

export async function getAllCharasSqlite() {
  try {

    const query = db.prepare('SELECT * FROM students ORDER BY charaName')
    const row = query.all();
    return row

  } catch (error) {
    console.error('Error al Ejecutar Consulta de Sqlite.', error)
  }

}


export async function insertCharaSqlite(chara) {
  if (chara.files === false) chara.files = 0
  else if (chara.files === true) chara.files = 1

  try {

    const query = db.prepare(`
    INSERT INTO students (
      charaName, name, lastName, school, role, combatClass,
      weaponType, age, birthday, height, hobbies, designer,
      illustrator, voice, releaseDate, url, files
    ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
  `);

    query.run(
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
      chara.files
    );

    console.log(`\n💚 ${chara.charaName} 💚\n`)

  } catch (error) {
    console.error('\nError al Ejecutar Consulta de Sqlite:\n', error)
  }

}


export async function getFilesUpdatesSqlite() {
  try {

    const query = db.prepare('SELECT * FROM students WHERE NOT files ORDER BY charaName');
    const row = query.all();
    return row

  } catch (error) {
    console.error('Error al Ejecutar Consulta de Sqlite.', error)
  }

}

export async function updateCharaFileSqlite(charaName) {

  try {
    const query = db.prepare(`UPDATE students SET files = true WHERE charaName = ?`);
    query.run(charaName);

    console.log(`\n💚 ${charaName} Completado 💚\n`);

  } catch (error) {
    console.error('\nError al Ejecutar Consulta de Sqlite:\n', error);
  }

}



export const closeSqlite = () => db.close()
/*
const consulta = await sqliteQuery('Select * from students')
if (consulta){
  console.log('Consulta es verdadera')
} else console.log('Consulta es falsa')
*/

/*
const createTables = async() => {

  try {
    
    const creatSchools = db.prepare(`
      CREATE TABLE IF NOT EXISTS schools(
        "schoolName" TEXT PRIMARY KEY
      )`
    );
*//*
    const insertSchools = db.prepare(`
        INSERT INTO schools (schoolName) VALUES
          ('Abydos'),
          ('Arius'),
          ('Gehenna'),
          ('Hyakkiyako'),
          ('Millennium'),
          ('Red Winter'),
          ('Shanhaijing'),
          ('SRT'),
          ('Trinity'),
          ('Valkyrie'),
          ('other');
        `)


    const createStudent =  db.prepare(`
      CREATE TABLE IF NOT EXISTS "students"(
        "charaName" TEXT PRIMARY KEY,
        "name" TEXT NOT NULL,
        "lastName" TEXT,
        "school" TEXT NOT NULL,
        "role" TEXT,
        "combatClass" TEXT,
        "weaponType" TEXT,
        "age" NUMERIC,
        "birthday" TEXT,
        "height" NUMERIC,
        "hobbies" TEXT,
        "designer" TEXT,
        "illustrator" TEXT,
        "voice" TEXT,
        "releaseDate" TEXT,
        "url" TEXT,
        "files" NUMERIC NOT NULL DEFAULT 0,
        FOREIGN KEY (school) REFERENCES schools (schoolName) ON UPDATE CASCADE ON DELETE SET NULL
    )
`);

    creatSchools.run()
    // insertSchools.run()
    createStudent.run()

  } catch (error) {
    console.error('\n\nError al crear las tablas de sqlite:\n',error)
  }
  

}
*/
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';