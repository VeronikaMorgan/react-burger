import { Middleware, MiddlewareAPI } from "redux";
import { TwsActions, TOrdersData } from "../utils/types/ws-types";
import { TAppActions } from "../utils/types/ws-types";
import { RootState } from "./store";
import { AppDispatch } from "./store";
import { wsTypes } from "../utils/types/ws-types";

export const wsMiddleware = (
  wsUrl: string,
  wsActions: TwsActions,
  wsType: wsTypes
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return next => (action: TAppActions) => {
      const {dispatch, getState} = store;
      const {type, payload} = action;
      const {
        wsStart, wsStop, connectRequest, disconnectRequest, onOpen, onClose, onError, onMessage,
      } = wsActions;

      if(type === wsStart && !getState().orders[wsType].isWsConnected) {
        socket = new WebSocket(wsUrl)
        dispatch(connectRequest())
      } 

      if(type === wsStop && getState().orders[wsType].isWsConnected) {
        socket?.close(1000)
        dispatch(disconnectRequest())
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen())
          console.log("Соединение установлено");
        }
        socket.onerror = (event) => {
          dispatch(onError('ошибочка on error'))
        }
        socket.onmessage = (event: MessageEvent<string>) => {
          const {success, orders, total, totalToday} = JSON.parse(event.data) as TOrdersData
          if(success) {
            dispatch(onMessage({orders, total, totalToday}))
          } else {
            dispatch(onError('ошибочка on message'))
          }
        }
        socket.onclose = (event: CloseEvent) => {
          if(event.wasClean) {
            dispatch(onClose())
            console.log(`Соединение закрыто с кодом -  ${event.code}`)
          } else {
            dispatch(onError('Проблемы с соединением!'))
            dispatch(onClose())
          }
        }
      }

      // if(type === wsSendMessage) {
      //   const message = {...payload}
      //   socket?.send(JSON.stringify(message))
      // }
    next(action);
    }
  })
}