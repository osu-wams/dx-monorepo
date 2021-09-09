import axios from 'axios';

export const getResetApiCache = () => axios.get(`api/admin/reset-api-cache`);
