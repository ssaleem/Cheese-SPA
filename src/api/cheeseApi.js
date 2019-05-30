import {API_URL, handleResponse} from './index';

const RESOURCE = 'cheeses';

// Get all cheeses by default, Get cheese by id if cheeseId provided
export function getCheeses (cheeseId = '',abortSignal = null) {
  return fetch (`${API_URL}/${RESOURCE}/${cheeseId}`).then (res => res.json ());
}

export function addCheese (cheese) {
  return fetch (`${API_URL}/${RESOURCE}/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (cheese),
  })
    .then (res => {
      // console.log (res.headers.get ('Location'));
      return res.json ();
    })
    .then (result => handleResponse (result));
}

export function updateCheese (cheeseId, cheese) {
  return fetch (`${API_URL}/${RESOURCE}/${cheeseId}`, {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (cheese),
  })
    .then (res => res.json ())
    .then (result => handleResponse (result));
}

export function deleteCheese (cheeseId) {
  return fetch (`${API_URL}/${RESOURCE}/${cheeseId}`, {
    method: 'delete',
  });
  // .then(res => console.log(res) )
}
