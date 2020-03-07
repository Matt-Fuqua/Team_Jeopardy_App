import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://cs411teambfs.web.illinois.edu/rdb4'
});

export default instance;
