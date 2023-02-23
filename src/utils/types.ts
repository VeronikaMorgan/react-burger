import React from "react"

export interface Iingredient {
  _id: string,
   name: string,
   type: string,
   proteins: number,
   fat: number,
   carbohydrates: number,
   calories: number,
   price: number,
   image: string,
   image_mobile: string,
   image_large: string,
   __v: number,
   uuid?: number
}

export interface IModalOverlay {
  closeModal: () => void
  children: React.ReactNode
}

export interface IModal extends IModalOverlay {
  title?: string
}

export interface IOrder {
  orderNumber: number
}

export interface IMain {
  closeModal: () => void
}

export interface IConstructorItem {
  data: Iingredient
  id: string
  index: number
  moveItemHandler: (dragIndex: number, hoverIndex: number) => void
}

export type TResetData = {
  password: string
  code: string
}

export type TUserData =  {
  email: string
  password: string
  name?: string
}

export type TUserSignUpData = {
  email: string
  password: string
  name: string
}

export type TPatchUserData =  {
  email?: string
  password?: string
  name?: string
}