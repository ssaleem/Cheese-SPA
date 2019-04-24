// const API = 'cheeses';
const BAD_REQUEST = 400;  //caused by form validation errors at server side

export function getCheeses(cheeseId='') {
  return fetch(`/cheeses/${cheeseId}`)
    .then(res => res.json());
}

export function addCheese(cheese) {
  return fetch("/cheeses/", {
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
  return fetch(`/cheeses/${cheeseId}`, {
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
}
