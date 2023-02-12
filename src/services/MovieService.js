import { useHttp } from "../hooks/http.hook";

const MovieService = () => {

    const {request, loading} = useHttp();

    const getActualMonth = (month) => {

        switch (month) {
            case 0:
                return 'JANUARY';
            case 1:
                return 'FEBRUARY';
            case 2:
                return 'MARCH';
            case 3:
                return 'APRIL';
            case 4:
                return 'MAY';
            case 5:
                return 'JUNE';
            case 6:
                return 'JULY';
            case 7:
                return 'AUGUST';
            case 8:
                return 'SEPTEMBER';
            case 9:
                return 'OCTOBER';
            case 10:
                return 'NOVEMBER';
            case 11:
                return 'DECEMBER';
        
            default:
                return 'JANUARY';
        }
    };

    const month = new Date().getMonth();
    const currentMonth = getActualMonth(month);

    const getFilms = async (month = currentMonth) => {

        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=${month}`)
        return _transformFilms(res);
    }

    const getFilmInfo = async (id) => {
        return (await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
                    .then(res => _getTransformFilmInfo(res)))
    };

    const getFilmByName = async (keyword) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=1`)
        return _transformFilmsForFind(res);
                    
    };

    const getCounryList = async () => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/filters`);
        return res;
    };

    const getFimsByParametrs = async (country, genre, startYear, endYear, minRate, maxRate) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${country}&genres=${genre}&order=RATING&type=ALL&ratingFrom=${minRate}&ratingTo=${maxRate}&yearFrom=${startYear}&yearTo=${endYear}&page=1`);
        return _transformFilmsForFindByParametrs(res);
    };

    const getSimilarFilms = async (id) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`);
        return _transformSimilarFilms(res);
    };

    const getTrailer = async (id) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`);
        return _transformTrailers(res);
    };

    const getStaff = async (id) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`);
        return transformStaff(res);
    };

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
                nameEn: item.nameEn,
                poster: item.posterUrl,
                year: item.year,
                country: item.countries[0].country, //массив стран
                genre: item.genres[0].genre, //массив жанров
                slogan: item.slogan,
                time: item.filmLength,
                description: item.description,
                background: item.coverUrl,
                ratingKinopoisk: item.ratingKinopoisk,
                id: item.kinopoiskId,
            }
        return info;

    }

    const _transformFilmsForFind = (res) => {
        let films = []
        
        films = res.films.map((films) => {
            return (
            {
                nameEn: films.nameEn,
                nameRu: films.nameRu,
                genre: films.genres[0].genre,
                posterUrl: films.posterUrl,
                year: films.year,
                id: films.filmId,
                time: films.filmLength,

            });
        });
        return films;
    }

    const _transformFilmsForFindByParametrs = (res) => {
        let films = []
        
        films = res.items.map((items) => {
            return (
            {
                nameEn: items.nameEn,
                nameRu: items.nameRu,
                genre: items.genres[0].genre,
                posterUrl: items.posterUrl,
                year: items.year,
                id: items.kinopoiskId,
                time: items.filmLength,

            });
        });
        return films;
    }

    const _transformSimilarFilms = (res) => {
        let films = []
        
        films = res.items.map((films) => {
            return (
            {
                name: films.nameEn,
                posterUrl: films.posterUrl,
                id: films.filmId
            });
        });
        return films;
    };

    const _transformTrailers = (res) => {
        let arr = [];
        for (let i = 0; i < res.items.length; i++) {
            if (res.items[i].site === 'YOUTUBE') {
                arr.push(res.items[i]);
            } else continue;
        };
        return arr;
    };

    const transformStaff = (res) => {
        let actors =[]
        res.forEach(el => {
            if (el.professionKey === "ACTOR") {
                actors.push(el)
            }
        });

        let directors =[]
        res.forEach(el => {
            if (el.professionKey === "DIRECTOR") {
                directors.push(el)
            }
        });

        const result = {actors: actors, directors: directors}
        return result;
    }

    return {getFilms, getFilmInfo, getActualMonth, getFilmByName, getCounryList, getFimsByParametrs, getSimilarFilms, getTrailer, getStaff, loading, getActualMonth}
}

export default MovieService;