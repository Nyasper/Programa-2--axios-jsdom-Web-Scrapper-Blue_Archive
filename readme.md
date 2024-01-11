# Blue Archive Web Scrapper
Cree Este programa para extraer los datos e Imágenes de los personajes de Blue Archive (juego gacha de smarphone). Dichos datos y Archivos los extraigo de la wiki del juego: https://bluearchive.wiki/wiki/Characters.
  
Los datos extraídos se guardan en la Base de Datos PostgreSQL local.  
  
# PASOS para Usar:
1 : Instalar las Dependencias con 'npm install'  
2 : Ejecutar el programa con 'npm start' 
# FUNCIONES SECUNDARIAS
-axiosRequests.js:  
Es donde están creadas las funciones necesarios para realizar las peticiones http a la página para extraer el HTML.  
   
-sequelize.js:   
Aquí se crea la Instancia de Sequelize. Sequelize es un ORM para manejar diferentes bases de datos con javascript.   
    
-studentsModel.js:   
Aquí se define el Modelo llamado ¨students¨ de la base de datos PotgreSQL.   
    
-postgreSQL.js:   
Aquí se ubican todas las funciones que interactúan directamente con PostgreSQL (CRUD).
    
-mongoDB.js:   
Archivo con todas las funciones necesarias para que el programa se comunique con la Base de Datos MongoDB utilizando la librería MONGOOSE.  
    
-synchronizeDB.js:  
Esta función actualiza la Base de Datos MongoDB utilizando los datos de PostgreSql local. Primero obtiene los datos de PostgreSQL y los compara con los de MongoDB, si falta algún registro en esta última los agrega. Esta funcón se le puede especificar el parámetro "FORCE" para que en vez de solo agregar los nuevos registros a MongoDB elimina todos los registros que ya existen y los vuelve a crear desde cero.
      
-scanCharaList.js:  
Función que escanea la lista de TODOS los personajes que están listados en la página: https://bluearchive.wiki/wiki/Characters y retorna un array con todos los nombres y una foto.
    
-scanCharaInfo.js:  
Función que al pasarle el URL de la página del personaje de la wiki, por ejemplo: ('https://bluearchive.wiki/wiki/${personaje}'), escanea y extrae toda su información y la retorna como un objeto de JavaScript.  
    
-searchUpdates.js:  
Llama a la función scanCharaList() que retorna un arreglo con todos los nombres de cada personaje registrado en la wiki, luego itera sobre cada nombre de personaje y compara dicho nombre de la wiki con el mismo nombre en la base de datos, si el personaje no existe en la base de datos lo agrega a un nuevo arreglo y lo retorna.  
    
-downloadFiles.js:   
Función que recibe por parámetro la información con los url de los archivos de imágenes y de audio de un personaje para luego descargarlos en el directorio /media del directorio raíz del proyecto.  
      
# FUNCIONES PRINCIPALES   
-Mostrar_Personajes_Pagina()  
LLama a la función scanCharaList() que retorna un arreglo con todos los nombres de los personajes de la wiki y luego itera sobre cada nombre para mostrarlo por consola.
    
-Buscar_Actualizaciones()   
Función que acepta el STRING ¨FULL¨ como parámetro. Si no se especifica dicho parámetro solo muestra por consola las actualizaciones disponibles para la base de datos. Si el parámetro es ¨FULL¨ muestra por consola todas las actualizaciones disponibles y también las inserta en la Base de Datos.   
    
-Descargar_Archivos_Personajes()  
Como su nombre lo indica esta es la función encargada de descargar TODOS los archivos de cada personaje, en total son 3 archivos: imagen de perfil, imagen completa(full), y archivo de audio. Dichos archivos se descargan en el directorio '/media/${nombre_escuela}/${nombre_personaje}/${formato}' en el directorio raíz del proyecto
     
# Referencias:  
💗Personajes en la Página💗  
💜No hay personajes nuevos para guardar en la base de datos💜  
💙Personaje Nuevo para guardar en la base de datos💙  
💚Personaje guardado en la base de datos💚  
🖤Personaje Eliminado de la Base de Datos🖤  