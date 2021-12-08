const API_KEY = "b2006aeccba3387038964f68af099dc3";
const BASE_URL = "https://api.themoviedb.org/3/";
const LANGUAGE = "&language=ru-RU"

const getData = url =>  fetch(url)
    .then(response => {
        if(response.ok){
            return response.json()
        }
        throw `Что-то пошло не так, ошибка ${response.status}`
    })
    .catch(err => console.error(err))
;

getData();

export const getTriends = async (type = "all", period = "week", page = "1") => {
    const url = `${BASE_URL}trending/${type}/${period}?api_key=${API_KEY}${LANGUAGE}&page=${page}`;
    return await getData(url);
   
};