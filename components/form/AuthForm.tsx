import React, { FormEvent, useState } from 'react';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Logo } from '@components';
import useInput from '@/hooks/useInput';
import { PASSWORD_RULES, USERNAME_RULES } from '@/global';

type FormType = 'Sign Up' | 'Login';

const AuthForm = () => {
  const {
    value: userName,
    isValid: userNameIsValid,
    isTouched: userNameIsTouched,
    onChange: userNameChange,
    onReset: resetUserName,
    onBlur: blurUserName,
  } = useInput((usNm) => USERNAME_RULES.regex.test(usNm));

  const {
    value: password,
    isValid: passwordIsValid,
    isTouched: passwordIsTouched,
    onChange: passwordChange,
    onReset: resetPassword,
    onBlur: blurPassword,
  } = useInput((pw) => PASSWORD_RULES.regex.test(pw));

  const [formType, setFormType] = useState<FormType>('Sign Up');
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = userNameIsValid && passwordIsValid;

  const changeFormType = () => {
    setFormType((prevType) => (prevType === 'Login' ? 'Sign Up' : 'Login'));
    resetUserName();
    resetPassword();
    setShowPassword(false);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formType === 'Sign Up') {
    } else {
    }
  };

  const showUserNameHint = userNameIsTouched && !userNameIsValid ? true : false;
  const showPasswordHint = passwordIsTouched && !passwordIsValid ? true : false;

  return (
    <form
      className='bg-white p-6 md:shadow-lg w-full max-w-2xl md:rounded-xl md:p-12 overflow-scroll'
      onSubmit={submitHandler}
    >
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
          minLength={USERNAME_RULES.min}
          maxLength={USERNAME_RULES.max}
          value={userName}
          onChange={(e) => userNameChange(e.target.value)}
          onBlur={blurUserName}
        />
        {showUserNameHint && <span className='userName-hint text-sm text-[#ff7f7f]'>{USERNAME_RULES.message}</span>}
      </div>
      <div className='mb-6 w-full'>
        <label htmlFor='password' className='block text-xl font-bold pb-3'>
          Password
        </label>
        <div className='relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            className='bg-zinc-100 rounded-lg px-4 py-2 w-full'
            minLength={PASSWORD_RULES.min}
            maxLength={PASSWORD_RULES.max}
            value={password}
            onChange={(e) => passwordChange(e.target.value)}
            onBlur={blurPassword}
          />
          <button
            type='button'
            className='absolute cursor-pointer right-0 bg-custom-blue h-full px-5 rounded-r-lg text-white hover:bg-stone-500 transition-colors duration-300'
            onClick={() => setShowPassword((prevVal) => !prevVal)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {showPasswordHint && <span className='password-hint text-sm text-[#ff7f7f]'>{PASSWORD_RULES.message}</span>}
      </div>
      <div className='mt-20 mb-3 flex justify-center'>
        <button className='primary' disabled={!isFormValid}>
          {formType}
        </button>
      </div>
      <div className='flex justify-center items-center gap-x-3 py-3'>
        {formType === 'Sign Up' ? <p>Have an account?</p> : <p>Don&#39;t Have an account?</p>}
        <button id='login' name='login' className='secondary' type='button' onClick={changeFormType}>
          {formType === 'Login' ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
