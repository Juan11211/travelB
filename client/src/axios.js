import axios from 'axios'

const instance = axios.create({
url: 'https://the-sneaker-database.p.rapidapi.com/',
  params: {limit: '<REQUIRED>'},
  headers: {
    'X-RapidAPI-Key': 'd5e7e32e1bmshf7626b5698184d1p1a093fjsn53eb856e94ff',
    'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com'
  }
})

export default instance;


