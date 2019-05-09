import {API_URL, handleResponse} from './index';

const RESOURCE = 'menus';

// Get all menus by default, Get menu by id if menuId provided
export function getMenus (menuId = '') {
  return fetch (`${API_URL}/${RESOURCE}/${menuId}`).then (res => res.json ());
}

export function addMenu (menu) {
  return fetch (`${API_URL}/${RESOURCE}/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (menu),
  })
    .then (res => {
      console.log (res.headers.get ('Location'));
      return res.json ();
    })
    .then (result => handleResponse (result));
}

export function addCheesestoMenu (menuId, cheeseIds) {
  return fetch (`${API_URL}/${RESOURCE}/${menuId}/cheeses/`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify (cheeseIds),
  })
    .then (res => {
      // console.log(res.headers.get('Location'));
      return res.json ();
    })
    .then (result => handleResponse (result));
}
// TODO: function that posts to delete cheese from menu and uses multiple promises to delete multiple cheeses at a time
