export default async function scanCharaList() {

  const charaList = []

  try {

    //JSDOM
    const dom = new JSDOM(await getDATACharaInfo('https://bluearchive.wiki/wiki/Characters'), { resources: 'usable' });
    const $selectElement = (selector) => dom.window.document.querySelector(selector);


    //Cantidad de personajes en la pagina:
    const totalChara = parseInt(await $selectElement("#mw-content-text > div.mw-parser-output > table > tbody").children.length)


    for (let i = 1; i < totalChara; i++) {
      charaList.push(
        {
          charaName: await $selectElement("#mw-content-text > div.mw-parser-output > table > tbody").children[i].children[1].textContent.replaceAll(' ', '_').trim(),
          img: 'https:' + (await $selectElement("#mw-content-text > div.mw-parser-output > table > tbody").children[i].children[0].children[0].children[0].children[0].src)
        })
    }
    return charaList

  } catch (e) {
    return console.error("\nSe a producido un error en la funcion 'scanCharaList()' al intentar hacer la peticion get con axios.\n\n")
  }
}


import { getDATACharaInfo } from './axiosRequests.js';
import { JSDOM } from "jsdom";