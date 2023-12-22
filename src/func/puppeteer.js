export default async function runPuppeteer(browserPath){

  try {
    

    const filesUpdates = await searchFilesUpdates()

    if (filesUpdates.length) {
  
      const browser = await puppeteer.launch({
        executablePath: browserPath,
        headless: false
      });
  
      const page = await browser.newPage() 
  
      for (const chara of filesUpdates) {

        console.log(`\n💙 Descargando Archivos de ${chara.charaName} 💙\n`)
        await page.goto(`https://bluearchive.wiki/wiki/${chara.charaName}`);
      
        //Descargar Audio del personaje
        await page.waitForSelector('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td')
        let audioUrl = await page.$eval('#mw-content-text > div.mw-parser-output > table.wikitable.character > tbody > tr:nth-child(18) > td',e=>e.dataset.voice)
        audioUrl = `https:${audioUrl}`
        await downloadFiles(audioUrl,chara.charaName,chara.school,'.ogg')
        .then(console.log(`\n💚 ${chara.charaName} audio`))
      
        //Descargar Imagen de Perfil
        let imgProfileUrl = await page.$eval('#Profile_Image-0 > figure > a > img',e=>e.src)
        await downloadFiles(imgProfileUrl,chara.charaName,chara.school,'.png')
        .then(console.log(`\n💚 ${chara.charaName} imgProfile`))
      
      
        //Descargar Imagen de Personaje Full
        await page.goto(`https://bluearchive.wiki/wiki/File:${chara.charaName}_full.png`);
        await page.click("#file > a > img");
        let imgFullUrl = page.url()
        await downloadFiles(imgFullUrl,chara.charaName,chara.school,'_full.png')
        .then(console.log(`\n💚 ${chara.charaName} imgFull`))
        
        await updateCharaFileSqlite(chara.charaName) //Cuando termina de Descargar los archivos cambia el estado de "files" a "true" en Sqlite
  
        }
        await browser.close()
        console.log('\n\nTodos los Archivos Actualizados con Éxito\n')
  
    }

  } catch (error) {
    console.error('Ha habido un error en la funcion runPuppeteer',error)
  }
}

import puppeteer from 'puppeteer-core'
import downloadFiles from './downloadFiles.js';
import searchFilesUpdates from './searchFilesUpdates.js';
import { updateCharaFileSqlite } from '../db/sqlite.js';