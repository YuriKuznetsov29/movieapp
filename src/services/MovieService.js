import { useHttp } from "../components/hooks/http.hook";

const MovieService = () => {

const {request} = useHttp();

const getFilms = async () => {

    const res = await request('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=NOVEMBER')
        return _transformFilms(res);
    }

    const getFilmInfo = async (id) => {
        return (await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
                    .then(res => _getTransformFilmInfo(res)))
    }

    const _transformFilms = (res) => {
        let films = []
        
        films = res.items.map((films) => {
            return (
            {
                name: films.nameEn,
                posterUrl: films.posterUrl,
                premier: films.premiereRu,
                id: films.kinopoiskId
            });
        });
        
        return films;
    }

    const _getTransformFilmInfo = (item) => {

        const info = 
            {
                name: item.nameRu,
                poster: item.posterUrl,
                year: item.year,
                country: item.countries[0].country, //массив стран
                genre: item.genres[0].genre, //массив жанров
                slogan: item.slogan,
                time: item.filmLength,
            }
        
        console.log(info);
        return info;
    }

    return {getFilms, getFilmInfo}
}

export default MovieService;