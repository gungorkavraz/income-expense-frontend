import axios from 'axios';

axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('accessToken');

export default axios;
