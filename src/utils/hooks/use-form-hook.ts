import React, {useState} from 'react'

export interface IForm {
	[name: string]: string
}

export function useForm<T>(inputValues: T) {
	const [values, setValues] = useState<T>(inputValues);
 
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	  const {value, name} = event.target;
	  setValues({...values, [name]: value});
	};
	return {values, handleChange, setValues};
 }