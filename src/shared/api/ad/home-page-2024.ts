// import homeAd2024MenuApiSchema from '@/schema/api/ad/home-page-2024/menu.js';
import axios from 'axios';

const API_AD_MENU_PATH = `${import.meta.env.PUBLIC_GO_API}${import.meta.env.PUBLIC_API_2024_AD}`;

export default (search = '') => axios.get(`${API_AD_MENU_PATH}?${search}`);
