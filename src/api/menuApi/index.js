const API = 'menus';
const BAD_REQUEST = 400;  //caused by form validation errors at server side

// Get all menus by default, Get menu by id if menuId provided
export function getMenus(menuId='') {
  return fetch(`/${API}/${menuId}`)
    .then(res => res.json());
}

export function addMenu(menu) {
  return fetch(`/${API}/`, {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(menu)
  })
  .then(res => { 
      console.log(res.headers.get('Location'));
      return res.json() 
  })
  .then(result => handleResponse(result));
}

export function addCheesestoMenu(menuId, cheeseIds) {
  return fetch(`/${API}/${menuId}/cheeses/`, {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(cheeseIds)
  })
  .then(res => { 
      // console.log(res.headers.get('Location'));
      return res.json() 
  })
  .then(result => handleResponse(result));
}
// TODO: function that posts to delete cheese from menu and uses multiple promises to delete multiple cheeses at a time 

function handleResponse(response) {
  console.log(response);
  let formErrors = [];
  if(response.status === BAD_REQUEST) {
    const errors = response.errors;
    for(let i = 0; i < errors.length; i++) {
      formErrors[errors[i].field] = errors[i].defaultMessage;
    }
    return Promise.reject(formErrors);
  }
  else {
    return Promise.resolve(response);
  }
}