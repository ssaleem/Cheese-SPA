export const API_URL = `${process.env.REACT_APP_API_HEROKU}`;
export const BAD_REQUEST = 400; //caused by form validation errors at server side

export function handleResponse (response) {
  let formErrors = [];
  if (response.status === BAD_REQUEST) {
    const errors = response.errors;
    for (let i = 0; i < errors.length; i++) {
      formErrors[errors[i].field] = errors[i].defaultMessage;
    }
    return Promise.reject (formErrors);
  } else {
    return Promise.resolve (response);
  }
}
