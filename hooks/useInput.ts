import { useReducer } from 'react';

type InputState = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

const initialState: InputState = {
  value: '',
  isValid: false,
  isTouched: false,
};

type InputAction = { type: 'INPUT'; payload: string } | { type: 'RESET' };

const reducer = (state: InputState, action: InputAction) => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.payload };
  }
  if (action.type === 'RESET') {
    return initialState;
  }
  return state;
};

const useInput = (validateFn: (inputText: string) => boolean) => {
  const [inputState, dispatch] = useReducer(reducer, initialState);

  const isValid = validateFn(inputState.value);

  const onChange = (val: string) => {
    dispatch({ type: 'INPUT', payload: val });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return { value: inputState.value, isValid, onChange, isTouched: inputState.isTouched, reset };
};

export default useInput;
