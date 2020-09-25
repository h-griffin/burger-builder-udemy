import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-88892.firebaseio.com/'
});


export default instance;