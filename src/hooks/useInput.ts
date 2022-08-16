import { ChangeEvent, useState } from 'react';

export interface IinputValue {
  value: string;
  onChange: Function;
  setDefaultValue: Function;
}

export const useInputValue = (initialValue: any): IinputValue => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const setDefaultValue = () => setValue(initialValue);
  return { value, onChange, setDefaultValue };
};
