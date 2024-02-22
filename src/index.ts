import mostrar_personajes_pagina from './mostrar_personajes_pagina.js';
import buscar_actualizaciones from './buscar_actualizaciones.js';
import descargar_archivos_personajes from './descargar_archivos_personajes.js';
import { mainMenu } from './func/inquirer';

async () => {
	const answer = await mainMenu();

	switch (answer) {
		case 1:
			mostrar_personajes_pagina();
			break;
		case 2:
			buscar_actualizaciones();
			break;
		case 3:
			descargar_archivos_personajes();
			break;
		case 4:
			process.exit(0);
		default:
			console.log('Opción no válida');
			break;
	}
};

/*
// userPrompt();
function userPrompt() {
  const separador = '\n-----------------------------------------------------------------------------------------------------------------------------------\n'
  console.log(separador)
  console.log('Opciones:\n\n')
  console.log('1: Listar todos los Personajes de la Página\n')
  console.log('2: Buscar si hay Actualizaciones Disponibles\n')
  console.log('3: Buscar si hay Actualizaciones Disponibles y Actualizar la Base de Datos\n')
  console.log('4: Descargar los Archivos faltantes')
  console.log(separador)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askQuestion() {
    return new Promise((resolve) => {
      rl.question('Ingresar una Opción: ', (respuesta) => {
        resolve(respuesta);
      });
    });
  }

  async function handleUserInput() {
    let respuesta;
    while (true) {
      respuesta = await askQuestion();
      switch (respuesta) {
        case '1': mostrar_personajes_pagina(); return;
        case '2': buscar_actualizaciones(); return;
        case '3': buscar_actualizaciones('FULL'); return;
        case '4': descargar_archivos_personajes(); return;
        default:
          console.log('Opción no válida');
          break;
      }
    }
  }

  handleUserInput()
    .then(() => rl.close())
    .catch((error) => {
      console.error('Error:', error);
      rl.close();
    });
}
*/
