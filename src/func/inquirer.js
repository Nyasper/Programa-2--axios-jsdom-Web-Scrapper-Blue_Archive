import inquirer from "inquirer";

const mainMenuOptions = [
  {
    type: 'list',
    name: 'opt',
    message: 'Elige una Opcion:\n',
    choices: [
      { name: '1: Listar todos los Personajes de la Página', value: 1 },
      { name: '2: Buscar si hay Actualizaciones Disponibles', value: 2 },
      { name: '3: Descargar los Archivos faltantes', value: 3 },
      new inquirer.Separator(),
      { name: '4: Salir', value: 4 }
    ]
  }
];


const updateMenuOptions = [
  {
    type: 'list',
    name: 'opt',
    message: 'Que desea hacer?\n',
    choices: [
      { name: '1: Actualizar', value: 1 },
      new inquirer.Separator(),
      { name: '2: Salir', value: 2 }
    ]
  }
];

export async function mainMenu() {
  console.clear();
  console.log('\n-----------------------------------------------------------------------------------------------------------------------------------\n');
  const { opt } = await inquirer.prompt(mainMenuOptions)
  return opt

}

export async function updateMenu() {
  console.log('\n-----------------------------------------------------------------------------------------------------------------------------------\n');
  const { opt } = await inquirer.prompt(updateMenuOptions)
  return opt

}