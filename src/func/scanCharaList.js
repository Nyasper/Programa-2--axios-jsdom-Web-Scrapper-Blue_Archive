let reintentos = 0

export default async function scanCharaList() {

  const charaList = []

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {


    const data = await getDATACharaInfo('https://bluearchive.wiki/wiki/Characters')



    //JSDOM
    const dom = new JSDOM(data);
    const $selectElement = (selector) => dom.window.document.querySelector(selector);


    //Cantidad de personajes en la pagina:
    const totalChara = parseInt(await $selectElement("#mw-content-text > div.mw-parser-output > table > tbody").children.length)


    for (let i = 1; i < totalChara; i++) {
      charaList.push(await $selectElement("#mw-content-text > div.mw-parser-output > table > tbody").children[i].children[1].textContent.trim().replaceAll(' ', '_'))
    }
    return charaList

  } catch (e) {
    if (reintentos < 5) {
      reintentos++
      console.error(`\nSe a producido un error en la peticion Axios en la funcion 'scanCharaList()' reitentando en 2 segundos (${reintentos}/${5})\n\n`)
      await delay(2000)
      return scanCharaList();
    }
    else return console.error("\nSe a producido un error en la funcion 'scanCharaList()' al intentar hacer la peticion get con axios.\n\n")
  }
}

import { getDATACharaInfo } from './axiosRequests.js';
import { JSDOM } from "jsdom";