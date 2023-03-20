import {Iingredient} from './types/types'
import { nanoid } from '@reduxjs/toolkit'

export const prepareIngredients = (ids: string[], ingredients: Iingredient[]):Iingredient[] | null => {
 const data = ids.map(ingredient => ingredients.find(item => item._id === ingredient)) as Iingredient[]
  const bun = data.find(item => item.type === 'bun') as Iingredient
 if(!bun) {
  return null
 }
 const filteredData = data.filter(item => item.type !== 'bun')
 const all = [bun, ...filteredData] as Iingredient[]
 return all?.map(item => {return {...item, nanoid: nanoid()}})
}