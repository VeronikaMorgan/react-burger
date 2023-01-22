export const BASE_URL = 'https://norma.nomoreparties.space/api/'

export const orderOptions = (ids) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "ingredients": ids
    })
  }
}

export function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res.status}`)
  }
  return res.json()
}

export function baseRequest(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)
}