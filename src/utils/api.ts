import { getCookie, deleteCookie, setCookie } from "./cookie"
import { TResetData, TPatchUserData } from "./types/types"

export const BASE_URL: string = 'https://norma.nomoreparties.space/api/';
export const BASE_WS_URL: string = 'wss://norma.nomoreparties.space/orders';

export const orderOptions = (ids: string[][]): RequestInit => {
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
export const getUserOptions = (): RequestInit => {
  return {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('access')}`,
    }
  }
}

export const registerOptions = (email: string, password: string, name: string): RequestInit => {
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


export const loginOptions = (email: string, password: string): RequestInit => {
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

export const logoutOptions = (): RequestInit => {
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
  console.log('tokenOptions')
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

export const resetPasswordOptions = ({ password, code }: TResetData): RequestInit => {
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


export function newBaseRequest(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options)
}

export function checkResponse(res: Response) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export function baseRequest(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)
}

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    console.log('here')
    const res = await baseRequest(url, options);
    return res
  } catch (err:any) {
    if (err.message === "jwt expired") {
      console.log('expired')
      const refreshData = await baseRequest('auth/token', tokenOptions()); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      setCookie('access', refreshData.accessToken.split('Bearer ')[1])
      setCookie('refresh', refreshData.refreshToken)
      const res = await baseRequest(url, options); //повторяем запрос
      return res
    } else {
      return Promise.reject(err);
    }
  }
};
