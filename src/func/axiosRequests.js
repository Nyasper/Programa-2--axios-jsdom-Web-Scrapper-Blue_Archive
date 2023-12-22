 //Axios
export async function getDATACharaInfo(url){
  try {
    const {data} = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.62",
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
    return data
  } catch (error) {
    console.error(`\nError intentar hacer la Peticion Axios en la funcion getDATACharaInfo con el parametro: ${url}\n`)
  }
  
}

export async function getArchivesStream(url){
  try {
    return await axios(url,{
      method: 'get',
      responseType: 'stream'
    });

  } catch (error) {
    console.error(`\nError intentar hacer la Peticion Axios en la funcion  getArchivesStream con el parametro: ${url}\n`)
  }
 
}
import axios from "axios";