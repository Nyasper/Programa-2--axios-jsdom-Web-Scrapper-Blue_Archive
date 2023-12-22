# Blue Archive Web Scrapper
Hice Este programa para extraer los datos desde: https://bluearchive.wiki/wiki/Characters y posteriormente subirlos a mi base de datos en MongoDB.
# Pasos para Usar:
1 : Instalar las Dependencias con 'npm install'  
2 : Ejecutar el programa con 'npm start' 
# Funciones Explicadas
-axiosRequests.js:  
Es donde inicializo y realizo las peticiones con la librería Axios. exporta 2 funciones una para scrappear los datos del personaje y otra para descargar archivos(no utilizada).  
-downloadFiles.js:  
Función que acepta un URL de un archivo como parámetro, sirve para descargar archivos en la ruta especificada.  
-mongoDB.js:  
Archivo con todas las funciones necesarias para que el programa se comunique con la Base de Datos MongoDB.  
-scanCharaList.js:  
Función que escanea la lista de TODOS los personajes que están listados en: https://bluearchive.wiki/wiki/Characters y retorna un array con todos los nombres y después genera un informa que se registra en el archivo resumen.txt.  
-scanCharaInfo.js:  
Función que al pasarle el URL de la página del personaje (https://bluearchive.wiki/wiki/{personaje}) escanea toda su información y la guarda en un objeto de JavaScript.  

-searchUpdates.js:  
Llama a la función scanCharaList() y con ese arreglo va iterando sobre cada nombre de personaje y realiza la consulta a mongoDB, si el personaje no existe en la base de datos retorna un nuevo arreglo que posteriormente lo sube a mongoDB si el parámetro es 'FULL'.  
-puppeteer.js:  
Utilizo la Biblioteca "Puppeteer" que ejecuta un navegador controlado por código. La función 'runPuppeteer()', ejecuta el navegador edge en este caso y lo uso para navegar hasta la página: https://bluearchive.wiki/wiki/{personaje} y acceder a cada url y con la función 'downloadFiles()' descargar los archivos necesarios de cada personaje.  
# Referencias:  
💗Personajes en la Página💗  
💜No hay personajes nuevos para guardar en la base de datos💜  
💙Personaje Nuevo para guardar en la base de datos💙  
💚Personaje guardado en la base de datos💚  
🖤Personaje Eliminado de la Base de Datos🖤  