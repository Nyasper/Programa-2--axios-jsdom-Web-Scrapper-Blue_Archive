import axios from 'axios';

export async function getHtmlFromUrl(url: string) {
	try {
		const { data } = await axios.get(url, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.62',
				'Content-Type': 'text/html; charset=UTF-8',
			},
		});
		return data;
	} catch (error) {
		console.error(
			`\n Error intentar hacer la Peticion Axios en la funcion getDATACharaInfo, EL PARAMETRO ES: ${url} \n`,
			error,
		);
	}
}

export async function getArchivesStream(url: string) {
	try {
		const { data } = await axios({
			method: 'get',
			url,
			responseType: 'stream',
		});
		return data;
	} catch (error) {
		console.error(
			`\n Error intentar hacer la Peticion Axios en la funcion  getArchivesStream con el parametro: ${url}\n `,
			error,
		);
	}
}
