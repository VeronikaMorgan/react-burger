import { getCookie } from "./cookie"
import { TResetData, TPatchUserData } from "./types"

export const BASE_URL:string = 'https://norma.nomoreparties.space/api/'

export const orderOptions = (ids: string[][]):RequestInit => {
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
export const getUserOptions = ():RequestInit => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access')}`,
    }
  }
}

export const registerOptions = (email:string, password:string, name: string):RequestInit => {
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


export const loginOptions = (email:string, password:string):RequestInit => {
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

export const logoutOptions = ():RequestInit => {
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


export const tokenOptions = (): RequestInit => {
  console.log(getCookie('refresh'))
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

export const sendResetEmailOptions = (email: string): RequestInit => {
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

export const resetPasswordOptions = ({password, code}: TResetData): RequestInit => {
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


export const patchUserOptions = (data: TPatchUserData) => {
  return {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access')}`,
    },
    body: JSON.stringify(data)
  }
}

export function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(`Ошибка ${res.status}`)
  }
  return res.json()
}

export function baseRequest(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)
}

export function newBaseRequest(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options)
}
