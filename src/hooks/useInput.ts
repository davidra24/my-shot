import { ChangeEvent, useState } from 'react';

export interface IinputValue {
  value: string;
  onChange: Function;
}

export const useInputValue = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const setDefaultValue = () => setValue(initialValue);
  return { value, onChange, setDefaultValue };
};
