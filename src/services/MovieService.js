import { useHttp } from "../components/hooks/http.hook";

const MovieService = () => {

    const {request} = useHttp();

    const getFilms = async () => {
        const res = await request('https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=NOVEMBER')
         return _transformFilms(res);
    }
    
    const _transformFilms = (res) => {
        let films = []
      
        films = res.items.map((films) => {
          return (
            {
                name: films.nameEn,
                posterUrl: films.posterUrl,
                premier: films.premiereRu
            })
        })
        return films
    }

    return {getFilms}
}

export default MovieService;