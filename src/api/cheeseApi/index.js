const API = 'cheeses';
const BAD_REQUEST = 400;  //caused by form validation errors at server side

// Get all cheeses by default, Get cheese by id if cheeseId provided
export function getCheeses(cheeseId='') {
  return fetch(`/${API}/${cheeseId}`)
    .then(res => res.json());
}

export function addCheese(cheese) {
  return fetch(`/${API}/`, {
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(cheese)
  })
  .then(res => { 
      console.log(res.headers.get('Location'));
      return res.json() 
  })
  .then(result => handleResponse(result));
}

export function updateCheese(cheeseId, cheese) {
  return fetch(`/${API}/${cheeseId}`, {
    method: 'put',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(cheese)
  })
  .then(res => res.json() )
  .then(result => handleResponse(result));
}

export function deleteCheese(cheeseId) {
  return fetch(`/${API}/${cheeseId}`, {
    method: 'delete'
  })
  // .then(res => console.log(res) )
}

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
