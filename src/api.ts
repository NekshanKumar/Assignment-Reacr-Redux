import axios from 'axios';

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

let baseURL = "https://blue-journalist-bbrpv.ineuron.app:4000"



export default axios.create({
    baseURL
});