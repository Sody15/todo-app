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

type InputAction = { type: 'INPUT'; payload: string } | { type: 'RESET' } | { type: 'BLUR' };

const reducer = (state: InputState, action: InputAction) => {
  if (action.type === 'INPUT') {
    return { ...state, value: action.payload };
  }
  if (action.type === 'RESET') {
    return initialState;
  }
  if (action.type === 'BLUR') {
    return { ...state, isTouched: true };
  }
  return state;
};

const useInput = (validateFn: (inputText: string) => boolean) => {
  const [inputState, dispatch] = useReducer(reducer, initialState);

  const isValid = validateFn(inputState.value);

  const onChange = (val: string) => {
    dispatch({ type: 'INPUT', payload: val });
  };

  const onBlur = () => {
    if (inputState.value.trim() !== '') {
      dispatch({ type: 'BLUR' });
    }
  };

  const onReset = () => {
    dispatch({ type: 'RESET' });
  };

  return { value: inputState.value, isValid, isTouched: inputState.isTouched, onBlur, onChange, onReset };
};

export default useInput;
