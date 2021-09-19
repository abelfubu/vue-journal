import axios from 'axios';

export default axios.create({
  baseURL: 'https://ingreso-egreso-app-cab66.firebaseio.com',
});
