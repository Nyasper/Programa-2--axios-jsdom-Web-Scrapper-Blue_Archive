import { getHtmlFromUrl } from './axiosRequests.js';
import { JSDOM } from 'jsdom';

export default async function scanCharaList() {
	const charaList = [];

	try {
		//JSDOM
		const dom = new JSDOM(await getHtmlFromUrl('https://bluearchive.wiki/wiki/Characters'), { resources: 'usable' });
		const $selectElement = (selector) => dom.window.document.querySelector(selector);

		//Cantidad de personajes en la pagina:
		const charaUl = $selectElement('#mw-content-text > div.mw-parser-output > table > tbody');
		const totalChara = parseInt(charaUl.children.length);
		for (let i = 1; i < totalChara; i++) {
			charaList.push({
				charaName: charaUl.children[i].children[1].textContent.trim().replaceAll(' ', '_'),
				img: 'https:' + charaUl.children[i].children[0].children[0].children[0].children[0].src,
			});
		}
		return charaList
	} catch (e) {
		return console.error(
			"\n Se a producido un error en la funcion 'scanCharaList()' al intentar hacer la peticion get con axios. \n\n"
				.bgRed,
		);
	}
}
