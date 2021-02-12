import axios from 'axios'

const http = axios.create({
    baseURL: 'https://v3.football.api-sports.io/',
    timeout: 10000,
    headers: {
        "x-rapidapi-key": process.env.X_RAPID_API_KEY,
        "x-rapidapi-host": process.env.X_RAPID_API_HOST,
        "useQueryString": true
    }
});

export default http;