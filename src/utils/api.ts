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
  console.log('ff')
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

export function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(res.status)
  }
  return res.json()
}

export function baseRequest(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse)
}

export function newBaseRequest(endpoint: string, options?: RequestInit) {
  return fetch(`${BASE_URL}${endpoint}`, options)
}


export function requestWithRefresh(endpoint: string, options: RequestInit) {
  return newBaseRequest(endpoint, options)
    .then(res => checkResponse(res))
    .catch(async err => {
      if (err === 403) {
        console.log('expired')
        const refreshData = await baseRequest('auth/token', tokenOptions())
        console.log('refreshed') //обновляем токен
        if (refreshData !== 200) {
          console.log(refreshData)
          return Promise.reject(refreshData);
        }
        console.log(getCookie('refresh'))
        deleteCookie("access")
        deleteCookie("refresh")
        const { accessToken, refreshToken } = refreshData
   
        setCookie('access', accessToken.split(' ')[1]);
        setCookie('refresh', refreshToken);
        const res = await baseRequest(endpoint, options);

        return res.data
      } else {
        return Promise.reject(err);
      }
    })
}

// export const myrefreshToken = () => {
//   return fetch(BASE_URL + '/auth/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       token: getCookie('refresh')
//     })
//   }).then(checkResponse);
// };

// export const fetchWithRefresh = async (url: string, options: RequestInit & { headers: { Authorization: string | any } }) => {
//   try {
//     const res = await fetch(url, options);
//     return await checkResponse(res);
//   } catch (err: any) {
//     if (err.message === "jwt expired") {
//       const refreshData = await myrefreshToken() 
//       console.log(4)
//       //обновляем токен
//       if (!refreshData.success) {
//         console.log(2)
//         return Promise.reject(refreshData);
//       }
//       const { accessToken, refreshToken } = refreshData
//       setCookie('access', accessToken.split(' ')[1]);
//       setCookie('refresh', refreshToken);

//       options.headers.Authorization = refreshData.accessToken;

//       const res = await fetch(url, options);
//       console.log(1111) //повторяем запрос
//       return await checkResponse(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };