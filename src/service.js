import axios from "axios";

const apikey = "97336ad3bfbc26669c5b575d61e20d96";
const BASE_URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.'
const DATA_FORMAT = '&format=json&nojsoncallback=1' 

const getDefault = (callback) => {
    const URL = `${BASE_URL}getRecent&api_key=${apikey}${DATA_FORMAT}`;
    axios
        .get(URL)
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getSearch = (callback,data) => {
    const URL = `${BASE_URL}search&api_key=${apikey}&text=${data}${DATA_FORMAT}&per_page=1000`;
    axios
        .get(URL)
        .then((response) => {
            callback(response);
        })
        .catch((err) => {
            console.log(err);
        });
};

export { getSearch, getDefault };