import { ChangeEventHandler } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { IDrink } from '../models/coctails.model';

interface toggleDrinkProps {
  index: number;
  checked: boolean;
  setChecked: Function;
  drink: IDrink;
}

export const ToggleDrink = ({
  index,
  checked,
  setChecked,
  drink
}: toggleDrinkProps) => (
  <>
    <ToggleButton
      id='toggle-check'
      type='checkbox'
      variant='secondary'
      checked={checked}
      value={index}
      onChange={(e) => {
        setChecked(index, e);
      }}
    >
      {drink.name}
    </ToggleButton>
  </>
);
