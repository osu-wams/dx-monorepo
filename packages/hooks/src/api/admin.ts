import axios from 'axios';
import { BASEURL } from '../constants';

export const getResetApiCache = () => axios.get(`${BASEURL}/api/admin/reset-api-cache`);
