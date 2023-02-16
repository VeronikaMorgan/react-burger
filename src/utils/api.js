import { getCookie } from "./cookie"

export const BASE_URL = 'https://norma.nomoreparties.space/api/'

export const orderOptions = (ids) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access')}`,
    },
    body: JSON.stringify({
      "ingredients": ids
    })
  }
}
export const getUserOptions = () => {
  console.log(getCookie('access'))
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access')}`,
    }
  }
}

export const registerOptions = (email, password, name) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  }
}


export const loginOptions = (email, password) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    })
  }
}

export const logoutOptions = () => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": getCookie('refresh')
    })
  }
}


export const tokenOptions = () => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "token": getCookie('refresh')
    })
  }
}

export const sendResetEmailOptions = (email) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  }
}

export const resetPasswordOptions = ({password, code}) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      "token": code
    })
  }
}


export const patchUserOptions = (data) => {
  return {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access')}`,
    },
    body: JSON.stringify(data)
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

