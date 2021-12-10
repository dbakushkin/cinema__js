import { getTriends, getVideo } from "./services.js";
import renderCard  from "./renderCard.js";

const filmWeek = document.querySelector(".film-week");
const firstRender = (data, {key}) => {
    const {
        vote_average: voteAverage,
        backdrop_path: backdropPath,
        name,
        original_name: originalName,
        original_title: originalTitle,
        title
    } = data
   
    filmWeek.innerHTML = `
    <div class="container film-week__container" data-rating="${voteAverage}">
        <div class="film-week__poster-wrapper">
            <img class="film-week__poster" src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${backdropPath}" alt="${name}">
         <p class="film-week__title_origin">${originalName || originalTitle}</p>
        </div>
        <h2 class="film-week__title">${name || title}</h2>
        ${key ?
             `<a class="film-week__watch-trailer tube" href="https://youtu.be/${key}" aria-label="смотреть трейлер"></a>` :
        ""} 
    </div>
    `
};

const renderVideo = async () => {
    const data = await getTriends();
    const[firstCard, ...otherCard] = data.results;
    otherCard.length = 12;



    const video = await getVideo(firstCard.id, firstCard.media_type);
    if(!video.results[0]) {
        video.results = [{key: null}]
    }

    firstRender(firstCard, video.results[0]);
    
    renderCard(otherCard);
}

export default renderVideo;