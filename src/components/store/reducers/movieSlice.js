import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    modalState: 'infowrapper',
    filmId: null,
    filmInfo: {},
    similarFilms: [],
    trailers: [],
    staff: {actors: [], directors: []},
    genres: [
        {
            "id": 1,
            "genre": "триллер"
        },
        {
            "id": 2,
            "genre": "драма"
        },
        {
            "id": 3,
            "genre": "криминал"
        },
        {
            "id": 4,
            "genre": "мелодрама"
        },
        {
            "id": 5,
            "genre": "детектив"
        },
        {
            "id": 6,
            "genre": "фантастика"
        },
        {
            "id": 7,
            "genre": "приключения"
        },
        {
            "id": 8,
            "genre": "биография"
        },
        {
            "id": 9,
            "genre": "фильм-нуар"
        },
        {
            "id": 10,
            "genre": "вестерн"
        },
        {
            "id": 11,
            "genre": "боевик"
        },
        {
            "id": 12,
            "genre": "фэнтези"
        },
        {
            "id": 13,
            "genre": "комедия"
        },
        {
            "id": 14,
            "genre": "военный"
        },
        {
            "id": 15,
            "genre": "история"
        },
        {
            "id": 16,
            "genre": "музыка"
        },
        {
            "id": 17,
            "genre": "ужасы"
        },
        {
            "id": 18,
            "genre": "мультфильм"
        },
        {
            "id": 19,
            "genre": "семейный"
        },
        {
            "id": 20,
            "genre": "мюзикл"
        },
        {
            "id": 21,
            "genre": "спорт"
        },
        {
            "id": 22,
            "genre": "документальный"
        },
        {
            "id": 23,
            "genre": "короткометражка"
        },
        {
            "id": 24,
            "genre": "аниме"
        },
        {
            "id": 25,
            "genre": ""
        },
        {
            "id": 26,
            "genre": "новости"
        },
        {
            "id": 27,
            "genre": "концерт"
        },
        {
            "id": 28,
            "genre": "для взрослых"
        },
        {
            "id": 29,
            "genre": "церемония"
        },
        {
            "id": 30,
            "genre": "реальное ТВ"
        },
        {
            "id": 31,
            "genre": "игра"
        },
        {
            "id": 32,
            "genre": "ток-шоу"
        },
        {
            "id": 33,
            "genre": "детский"
        }
    ],
    countries: [
        {
            "id": 1,
            "country": "США"
        },
        {
            "id": 2,
            "country": "Швейцария"
        },
        {
            "id": 3,
            "country": "Франция"
        },
        {
            "id": 4,
            "country": "Польша"
        },
        {
            "id": 5,
            "country": "Великобритания"
        },
        {
            "id": 6,
            "country": "Швеция"
        },
        {
            "id": 7,
            "country": "Индия"
        },
        {
            "id": 8,
            "country": "Испания"
        },
        {
            "id": 9,
            "country": "Германия"
        },
        {
            "id": 10,
            "country": "Италия"
        },
        {
            "id": 11,
            "country": "Гонконг"
        },
        {
            "id": 12,
            "country": "Германия (ФРГ)"
        },
        {
            "id": 13,
            "country": "Австралия"
        },
        {
            "id": 14,
            "country": "Канада"
        },
        {
            "id": 15,
            "country": "Мексика"
        },
        {
            "id": 16,
            "country": "Япония"
        },
        {
            "id": 17,
            "country": "Дания"
        },
        {
            "id": 18,
            "country": "Чехия"
        },
        {
            "id": 19,
            "country": "Ирландия"
        },
        {
            "id": 20,
            "country": "Люксембург"
        },
        {
            "id": 21,
            "country": "Китай"
        },
        {
            "id": 22,
            "country": "Норвегия"
        },
        {
            "id": 23,
            "country": "Нидерланды"
        },
        {
            "id": 24,
            "country": "Аргентина"
        },
        {
            "id": 25,
            "country": "Финляндия"
        },
        {
            "id": 26,
            "country": "Босния и Герцеговина"
        },
        {
            "id": 27,
            "country": "Австрия"
        },
        {
            "id": 28,
            "country": "Тайвань"
        },
        {
            "id": 29,
            "country": "Новая Зеландия"
        },
        {
            "id": 30,
            "country": "Бразилия"
        },
        {
            "id": 31,
            "country": "Чехословакия"
        },
        {
            "id": 32,
            "country": "Мальта"
        },
        {
            "id": 33,
            "country": "СССР"
        },
        {
            "id": 34,
            "country": "Россия"
        },
        {
            "id": 35,
            "country": "Югославия"
        },
        {
            "id": 36,
            "country": "Португалия"
        },
        {
            "id": 37,
            "country": "Румыния"
        },
        {
            "id": 38,
            "country": "Хорватия"
        },
        {
            "id": 39,
            "country": "ЮАР"
        },
        {
            "id": 40,
            "country": "Куба"
        },
        {
            "id": 41,
            "country": "Колумбия"
        },
        {
            "id": 42,
            "country": "Израиль"
        },
        {
            "id": 43,
            "country": "Намибия"
        },
        {
            "id": 44,
            "country": "Турция"
        },
        {
            "id": 45,
            "country": "Бельгия"
        },
        {
            "id": 46,
            "country": "Сальвадор"
        },
        {
            "id": 47,
            "country": "Исландия"
        },
        {
            "id": 48,
            "country": "Венгрия"
        },
        {
            "id": 49,
            "country": "Корея Южная"
        },
        {
            "id": 50,
            "country": "Лихтенштейн"
        },
        {
            "id": 51,
            "country": "Болгария"
        },
        {
            "id": 52,
            "country": "Филиппины"
        },
        {
            "id": 53,
            "country": "Доминикана"
        },
        {
            "id": 54,
            "country": ""
        },
        {
            "id": 55,
            "country": "Марокко"
        },
        {
            "id": 56,
            "country": "Таиланд"
        },
        {
            "id": 57,
            "country": "Кения"
        },
        {
            "id": 58,
            "country": "Пакистан"
        },
        {
            "id": 59,
            "country": "Иран"
        },
        {
            "id": 60,
            "country": "Панама"
        },
        {
            "id": 61,
            "country": "Аруба"
        },
        {
            "id": 62,
            "country": "Ямайка"
        },
        {
            "id": 63,
            "country": "Греция"
        },
        {
            "id": 64,
            "country": "Тунис"
        },
        {
            "id": 65,
            "country": "Кыргызстан"
        },
        {
            "id": 66,
            "country": "Пуэрто Рико"
        },
        {
            "id": 67,
            "country": "Казахстан"
        },
        {
            "id": 68,
            "country": "Югославия (ФР)"
        },
        {
            "id": 69,
            "country": "Алжир"
        },
        {
            "id": 70,
            "country": "Германия (ГДР)"
        },
        {
            "id": 71,
            "country": "Сингапур"
        },
        {
            "id": 72,
            "country": "Словакия"
        },
        {
            "id": 73,
            "country": "Афганистан"
        },
        {
            "id": 74,
            "country": "Индонезия"
        },
        {
            "id": 75,
            "country": "Перу"
        },
        {
            "id": 76,
            "country": "Бермуды"
        },
        {
            "id": 77,
            "country": "Монако"
        },
        {
            "id": 78,
            "country": "Зимбабве"
        },
        {
            "id": 79,
            "country": "Вьетнам"
        },
        {
            "id": 80,
            "country": "Антильские Острова"
        },
        {
            "id": 81,
            "country": "Саудовская Аравия"
        },
        {
            "id": 82,
            "country": "Танзания"
        },
        {
            "id": 83,
            "country": "Ливия"
        },
        {
            "id": 84,
            "country": "Ливан"
        },
        {
            "id": 85,
            "country": "Кувейт"
        },
        {
            "id": 86,
            "country": "Египет"
        },
        {
            "id": 87,
            "country": "Литва"
        },
        {
            "id": 88,
            "country": "Венесуэла"
        },
        {
            "id": 89,
            "country": "Словения"
        },
        {
            "id": 90,
            "country": "Чили"
        },
        {
            "id": 91,
            "country": "Багамы"
        },
        {
            "id": 92,
            "country": "Эквадор"
        },
        {
            "id": 93,
            "country": "Коста-Рика"
        },
        {
            "id": 94,
            "country": "Кипр"
        },
        {
            "id": 95,
            "country": "Уругвай"
        },
        {
            "id": 96,
            "country": "Ирак"
        },
        {
            "id": 97,
            "country": "Мартиника"
        },
        {
            "id": 98,
            "country": "Эстония"
        },
        {
            "id": 99,
            "country": "ОАЭ"
        },
        {
            "id": 100,
            "country": "Бангладеш"
        },
        {
            "id": 101,
            "country": "Македония"
        },
        {
            "id": 102,
            "country": "Гвинея"
        },
        {
            "id": 103,
            "country": "Иордания"
        },
        {
            "id": 104,
            "country": "Латвия"
        },
        {
            "id": 105,
            "country": "Армения"
        },
        {
            "id": 106,
            "country": "Украина"
        },
        {
            "id": 107,
            "country": "Сирия"
        },
        {
            "id": 108,
            "country": "Шри-Ланка"
        },
        {
            "id": 109,
            "country": "Нигерия"
        },
        {
            "id": 110,
            "country": "Берег Слоновой кости"
        },
        {
            "id": 111,
            "country": "Грузия"
        },
        {
            "id": 112,
            "country": "Сенегал"
        },
        {
            "id": 113,
            "country": "Монголия"
        },
        {
            "id": 114,
            "country": "Габон"
        },
        {
            "id": 115,
            "country": "Замбия"
        },
        {
            "id": 116,
            "country": "Албания"
        },
        {
            "id": 117,
            "country": "Камерун"
        },
        {
            "id": 118,
            "country": "Буркина-Фасо"
        },
        {
            "id": 119,
            "country": "Узбекистан"
        },
        {
            "id": 120,
            "country": "Малайзия"
        },
        {
            "id": 121,
            "country": "Сербия"
        },
        {
            "id": 122,
            "country": "Гана"
        },
        {
            "id": 123,
            "country": "Таджикистан"
        },
        {
            "id": 124,
            "country": "Гаити"
        },
        {
            "id": 125,
            "country": "Конго (ДРК)"
        },
        {
            "id": 126,
            "country": "Гватемала"
        },
        {
            "id": 127,
            "country": "Российская империя"
        },
        {
            "id": 128,
            "country": "Беларусь"
        },
        {
            "id": 129,
            "country": "Молдова"
        },
        {
            "id": 130,
            "country": "Азербайджан"
        },
        {
            "id": 131,
            "country": "Палестина"
        },
        {
            "id": 132,
            "country": "Оккупированная Палестинская территория"
        },
        {
            "id": 133,
            "country": "Корея Северная"
        },
        {
            "id": 134,
            "country": "Никарагуа"
        },
        {
            "id": 135,
            "country": "Камбоджа"
        },
        {
            "id": 136,
            "country": "Ангола"
        },
        {
            "id": 137,
            "country": "Сербия и Черногория"
        },
        {
            "id": 138,
            "country": "Непал"
        },
        {
            "id": 139,
            "country": "Бенин"
        },
        {
            "id": 140,
            "country": "Гваделупа"
        },
        {
            "id": 141,
            "country": "Гренландия"
        },
        {
            "id": 142,
            "country": "Гвинея-Бисау"
        },
        {
            "id": 143,
            "country": "Макао"
        },
        {
            "id": 144,
            "country": "Парагвай"
        },
        {
            "id": 145,
            "country": "Мавритания"
        },
        {
            "id": 146,
            "country": "Руанда"
        },
        {
            "id": 147,
            "country": "Фарерские острова"
        },
        {
            "id": 148,
            "country": "Кот-д’Ивуар"
        },
        {
            "id": 149,
            "country": "Гибралтар"
        },
        {
            "id": 150,
            "country": "Ботсвана"
        },
        {
            "id": 151,
            "country": "Боливия"
        },
        {
            "id": 152,
            "country": "Мадагаскар"
        },
        {
            "id": 153,
            "country": "Кабо-Верде"
        },
        {
            "id": 154,
            "country": "Чад"
        },
        {
            "id": 155,
            "country": "Мали"
        },
        {
            "id": 156,
            "country": "Фиджи"
        },
        {
            "id": 157,
            "country": "Бутан"
        },
        {
            "id": 158,
            "country": "Барбадос"
        },
        {
            "id": 159,
            "country": "Тринидад и Тобаго"
        },
        {
            "id": 160,
            "country": "Мозамбик"
        },
        {
            "id": 161,
            "country": "Заир"
        },
        {
            "id": 162,
            "country": "Андорра"
        },
        {
            "id": 163,
            "country": "Туркменистан"
        },
        {
            "id": 164,
            "country": "Гайана"
        },
        {
            "id": 165,
            "country": "Корея"
        },
        {
            "id": 166,
            "country": "Нигер"
        },
        {
            "id": 167,
            "country": "Конго"
        },
        {
            "id": 168,
            "country": "Того"
        },
        {
            "id": 169,
            "country": "Ватикан"
        },
        {
            "id": 170,
            "country": "Черногория"
        },
        {
            "id": 171,
            "country": "Бурунди"
        },
        {
            "id": 172,
            "country": "Папуа - Новая Гвинея"
        },
        {
            "id": 173,
            "country": "Бахрейн"
        },
        {
            "id": 174,
            "country": "Гондурас"
        },
        {
            "id": 175,
            "country": "Судан"
        },
        {
            "id": 176,
            "country": "Эфиопия"
        },
        {
            "id": 177,
            "country": "Йемен"
        },
        {
            "id": 178,
            "country": "Вьетнам Северный"
        },
        {
            "id": 179,
            "country": "Суринам"
        },
        {
            "id": 180,
            "country": "Маврикий"
        },
        {
            "id": 181,
            "country": "Белиз"
        },
        {
            "id": 182,
            "country": "Либерия"
        },
        {
            "id": 183,
            "country": "Лесото"
        },
        {
            "id": 184,
            "country": "Уганда"
        },
        {
            "id": 185,
            "country": "Каймановы острова"
        },
        {
            "id": 186,
            "country": "Антигуа и Барбуда"
        },
        {
            "id": 187,
            "country": "Западная Сахара"
        },
        {
            "id": 188,
            "country": "Сан-Марино"
        },
        {
            "id": 189,
            "country": "Гуам"
        },
        {
            "id": 190,
            "country": "Косово"
        },
        {
            "id": 191,
            "country": "Лаос"
        },
        {
            "id": 192,
            "country": "Катар"
        },
        {
            "id": 193,
            "country": "Оман"
        },
        {
            "id": 194,
            "country": "Американские Виргинские острова"
        },
        {
            "id": 195,
            "country": "Сиам"
        },
        {
            "id": 196,
            "country": "Сьерра-Леоне"
        },
        {
            "id": 197,
            "country": "Эритрея"
        },
        {
            "id": 198,
            "country": "Сомали"
        },
        {
            "id": 199,
            "country": "Доминика"
        },
        {
            "id": 200,
            "country": "Бирма"
        },
        {
            "id": 201,
            "country": "Реюньон"
        },
        {
            "id": 202,
            "country": "Федеративные Штаты Микронезии"
        },
        {
            "id": 203,
            "country": "Самоа"
        },
        {
            "id": 204,
            "country": "Американское Самоа"
        },
        {
            "id": 205,
            "country": "Свазиленд"
        },
        {
            "id": 206,
            "country": "Французская Полинезия"
        },
        {
            "id": 207,
            "country": "Мьянма"
        },
        {
            "id": 208,
            "country": "Новая Каледония"
        },
        {
            "id": 209,
            "country": "Французская Гвиана"
        },
        {
            "id": 210,
            "country": "Сент-Винсент и Гренадины"
        },
        {
            "id": 211,
            "country": "Малави"
        },
        {
            "id": 212,
            "country": "Экваториальная Гвинея"
        },
        {
            "id": 213,
            "country": "Коморы"
        },
        {
            "id": 214,
            "country": "Кирибати"
        },
        {
            "id": 215,
            "country": "Тувалу"
        },
        {
            "id": 216,
            "country": "Тимор-Лесте"
        },
        {
            "id": 217,
            "country": "ЦАР"
        },
        {
            "id": 218,
            "country": "Тонга"
        },
        {
            "id": 219,
            "country": "Гренада"
        },
        {
            "id": 220,
            "country": "Гамбия"
        },
        {
            "id": 221,
            "country": "Антарктида"
        },
        {
            "id": 222,
            "country": "Острова Кука"
        },
        {
            "id": 223,
            "country": "Остров Мэн"
        },
        {
            "id": 224,
            "country": "Внешние малые острова США"
        },
        {
            "id": 225,
            "country": "Монтсеррат"
        },
        {
            "id": 226,
            "country": "Маршалловы острова"
        },
        {
            "id": 227,
            "country": "Бруней-Даруссалам"
        },
        {
            "id": 228,
            "country": "Сейшельские острова"
        },
        {
            "id": 229,
            "country": "Палау"
        },
        {
            "id": 230,
            "country": "Сент-Люсия"
        },
        {
            "id": 231,
            "country": "Вануату"
        },
        {
            "id": 232,
            "country": "Мальдивы"
        },
        {
            "id": 233,
            "country": "Босния"
        },
        {
            "id": 234,
            "country": "Уоллис и Футуна"
        },
        {
            "id": 235,
            "country": "Белоруссия"
        },
        {
            "id": 236,
            "country": "Киргизия"
        },
        {
            "id": 239,
            "country": "Джибути"
        },
        {
            "id": 240,
            "country": "Виргинские Острова (США)"
        },
        {
            "id": 241,
            "country": "Северная Македония"
        },
        {
            "id": 242,
            "country": "Виргинские Острова (Великобритания)"
        },
        {
            "id": 3545269,
            "country": "Сент-Люсия "
        },
        {
            "id": 3781461,
            "country": "Сент-Китс и Невис"
        },
        {
            "id": 3985922,
            "country": "Соломоновы Острова"
        },
        {
            "id": 4336645,
            "country": "Виргинские Острова"
        },
        {
            "id": 7801402,
            "country": "Фолклендские острова"
        },
        {
            "id": 10842163,
            "country": "Остров Святой Елены"
        },
        {
            "id": 32518739,
            "country": "острова Теркс и Кайкос"
        },
        {
            "id": 47738117,
            "country": "Мелкие отдаленные острова США"
        }
    ]
}

const movieInfoSlice = createSlice({
    name: 'movieInfo',
    initialState,
    reducers: {
        ModalShow: (state) => {
            state.modalState = 'infowrapper show';
        },
        ModalClose: (state) => {
            state.modalState = 'infowrapper';
        },
        setFilmId: (state, action) => {
            state.filmId = action.payload;
        },
        setFilmInfo: (state, action) => {
            state.filmInfo = action.payload;
        },
        setSimilarFilms: (state, action) => {
            state.similarFilms = action.payload;
        },
        setTrailars: (state, action) => {
            state.trailers = action.payload;
        },
        setStaff: (state, action) => {
            state.staff = action.payload;
        },
    },
});

const {actions, reducer} = movieInfoSlice;

export default reducer;

export const {ModalShow, ModalClose, setFilmId, setFilmInfo, setSimilarFilms, setTrailars, setStaff} = actions;