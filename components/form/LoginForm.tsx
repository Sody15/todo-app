import React, { useState } from 'react';
import { Logo } from '@components';
import useInput from '@/hooks/useInput';

type FormType = 'Sign Up' | 'Login';

const LoginForm = () => {
  const {
    value: userName,
    isValid: userNameIsValid,
    onChange: userNameChange,
    reset: resetUserName,
  } = useInput((s) => s.length > 5);

  const {
    value: password,
    isValid: passwordIsValid,
    onChange: passwordChange,
    reset: resetPassword,
  } = useInput((s) => s.length > 5);

  const [formType, setFormType] = useState<FormType>('Login');
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = userNameIsValid && passwordIsValid;

  const changeFormType = () => {
    setFormType((prevType) => (prevType === 'Login' ? 'Sign Up' : 'Login'));
    resetUserName();
    resetPassword();
  };

  return (
    <form className='bg-white p-6 shadow-lg w-full max-w-2xl md:rounded-xl md:p-12 overflow-scroll'>
      {/* UserName <br />
      {userName}
      <br />
      {JSON.stringify(userNameIsValid)}
      <br />
      <br />
      Password
      <br />
      {password}
      <br />
      {JSON.stringify(passwordIsValid)} */}
      <div className='flex justify-center mb-6'>
        <Logo />
      </div>
      <div className='mb-6 w-full'>
        <label htmlFor='username' className='block text-xl font-bold pb-3'>
          Username
        </label>
        <input
          type='text'
          name='username'
          id='username'
          className='bg-zinc-100 rounded-lg px-4 py-2 w-full'
          value={userName}
          onChange={(e) => userNameChange(e.target.value)}
        />
      </div>
      <div className='mb-6 w-full'>
        <label htmlFor='password' className='block text-xl font-bold pb-3'>
          Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          id='password'
          className='bg-zinc-100 rounded-lg px-4 py-2 w-full'
          value={password}
          onChange={(e) => passwordChange(e.target.value)}
        />
      </div>
      <button className='primary' disabled={!isFormValid}>
        {formType}
      </button>
      <div className='flex justify-center items-center gap-x-3 py-3'>
        {formType === 'Login' ? <p>Have an account?</p> : <p>Don&#39;t Have an account?</p>}
        <button id='login' name='login' className='secondary' type='button' onClick={changeFormType}>
          {formType === 'Login' ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
