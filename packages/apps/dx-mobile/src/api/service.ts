import axios from 'axios';

// ! This needs fixing. For localhost testing, emulators disallow non-SSL requests, we need
// ! to figure out how to run the local dev environment in HTTPS or to figure
// ! out how to get Expo to allow for it.
// ! @see https://forums.expo.io/t/how-to-add-usescleartexttraffic-permtion-androidmainfest-xml/30680
export default axios.create({
  baseURL: 'https://dev.my.oregonstate.edu',
  timeout: 15000,
  headers: { 'X-Custom-Auth-Header': 'blah' },
});
