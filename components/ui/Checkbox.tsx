import React, { FC, useState } from 'react';

import styles from './Checkbox.module.css';

export const Checkbox: FC<{
  checked?: boolean;
  label: string;
  name: string;
  onChange: (checked: boolean) => void;
}> = ({ checked = false, label, name, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const checkHandler = () => {
    setIsChecked((prevState) => !prevState);
    onChange(!isChecked);
  };

  return (
    <div className={styles.container}>
      <label tabIndex={0} htmlFor={name} onClick={checkHandler}>
        <span>{label}</span>
        <input type='checkbox' name={name} className={styles.checkbox} checked={isChecked} onChange={() => null} />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};

export default Checkbox;
