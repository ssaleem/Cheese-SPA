import {API_URL, handleResponse} from './index';

const RESOURCE = 'categories';

export function getCategories (abortSignal = null) {
  return fetch (`${API_URL}/${RESOURCE}/`, {signal: abortSignal}).then (res =>
    res.json ()
  );
}

export function addCategory (category) {
  return fetch (`${API_URL}/${RESOURCE}/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (category),
  })
    .then (res => {
      // console.log (res.headers.get ('Location'));
      return res.json ();
    })
    .then (result => handleResponse (result));
}
