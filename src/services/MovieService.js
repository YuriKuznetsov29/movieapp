import { useHttp } from "../components/hooks/http.hook";
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { getDatabase, ref, update, set} from "firebase/database";
import { useSelector } from "react-redux";

    const MovieService = () => {

    const {request} = useHttp();

    const auth = getAuth();

    const dataFavorite = useSelector(state => state.userProfile.dataFavorite);
    const dataViewed = useSelector(state => state.userProfile.dataViewed);
    

    const deleteFavoriteFilm = (key) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            const db = getDatabase();
            let newData = Object.assign({}, dataFavorite);
            delete newData[key];
            const updates = {};
            updates[`users/` + uid + `/favoriteFilms/`] = newData;
            if (newData !== {}) {
                update(ref(db), updates);
            } else {
                set(ref(db, `users/` + uid + `/favoriteFilms/`), null);
            }
        } else {
          console.log('User is signed out');
        }
    });
    }

    const deleteViewedFilm = (key) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                const db = getDatabase();
                let newData = Object.assign({}, dataViewed);
                delete newData[key];
                const updates = {};
                updates[`users/` + uid + `/viewedFilms/`] = newData;
                if (newData !== {}) {
                    update(ref(db), updates);
                } else {
                    set(ref(db, `users/` + uid + `/viewedFilms/`), null);
                }
            } else {
              console.log('User is signed out');
            }
        });
        }

    const getActualMonth = () => {

        const date = new Date();
        const month = date.getMonth();

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

    const currentMonth = getActualMonth();

    const getFilms = async () => {

        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=${currentMonth}`)
        return _transformFilms(res);
    };

    const getFilmInfo = async (id) => {
        return (await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
                    .then(res => _getTransformFilmInfo(res)))
    };

    const getFilmByName = async (keyword) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=1`)
        // console.log(res)
        return _transformFilmsForFind(res);
                    
    };

    const getCounryList = async () => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/filters`);
        // console.log(res);
        return res;
    };

    const getFimsByParametrs = async (country, genre, startYear, endYear) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=${country}&genres=${genre}&order=RATING&type=ALL&ratingFrom=0&ratingTo=10&yearFrom=${startYear}&yearTo=${endYear}&page=1`);
        // console.log(res);
        return _transformFilmsForFindByParametrs(res);
    };

    const getSimilarFilms = async (id) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/similars`);
        console.log(res);
        return _transformSimilarFilms(res);
    };

    const getTrailer = async (id) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/videos`);
        // console.log(res);
        return res;
    };

    const getStaff = async (id) => {
        const res = await request(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`);
        return transformStaff(res);
    };


    //https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=301

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
        // console.log(films);
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
                id: item.kinopoiskId,
            }
        
        // console.log(info);
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
        //  console.log(films);
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
        //  console.log(films);
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
        // console.log(films);
        return films;
    }

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

    return {getFilms, getFilmInfo, getActualMonth, getFilmByName, getCounryList, getFimsByParametrs, getSimilarFilms, getTrailer, getStaff, deleteFavoriteFilm, deleteViewedFilm}
}

export default MovieService;