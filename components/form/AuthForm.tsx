import React, { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { Logo } from '@components';
import useInput from '@/hooks/useInput';
import { LOCALSTORAGE_USERID, LOCALSTORAGE_USERNAME, PASSWORD_RULES, USERNAME_RULES } from '@/global';
import { login, signUp } from '@/services/user-service';

type FormType = 'Sign Up' | 'Login';

const AuthForm = () => {
  const router = useRouter();

  const {
    value: userName,
    isValid: userNameIsValid,
    isTouched: userNameIsTouched,
    onChange: userNameChange,
    onReset: resetUserName,
    onBlur: blurUserName,
  } = useInput((userName) => USERNAME_RULES.regex.test(userName));

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = useMemo(() => userNameIsValid && passwordIsValid, [userNameIsValid, passwordIsValid]);

  const showUserNameHint = useMemo(
    () => (userNameIsTouched && !userNameIsValid ? true : false),
    [userNameIsTouched, userNameIsValid]
  );

  const showPasswordHint = useMemo(
    () => (passwordIsTouched && !passwordIsValid ? true : false),
    [passwordIsTouched, passwordIsValid]
  );

  const changeFormType = () => {
    setFormType((prevType) => (prevType === 'Login' ? 'Sign Up' : 'Login'));
    resetUserName();
    resetPassword();
    setShowPassword(false);
  };

  const onSignUp = () =>
    signUp({ userName, password })
      .then(({ insertedId, userName }) => {
        setUserDetails(insertedId, userName);
        router.push('/');
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsSubmitting(false);
      });

  const onLogin = () =>
    login({ userName, password })
      .then(({ _id, userName }) => {
        setUserDetails(_id, userName);
        router.push('/');
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsSubmitting(false);
      });

  const setUserDetails = (id: string, userName: string) => {
    // Set localstorage
    localStorage.setItem(LOCALSTORAGE_USERID, id);
    localStorage.setItem(LOCALSTORAGE_USERNAME, userName);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (formType === 'Sign Up') {
      onSignUp();
    } else {
      onLogin();
    }
  };

  return (
    <form
      className='bg-white p-6 md:shadow-2xl w-full max-w-2xl md:rounded-xl md:p-12 overflow-scroll'
      onSubmit={submitHandler}
    >
      <div className='flex justify-center mb-6'>
        <Logo />
      </div>
      {
        // Error from server
      }
      {error && <div>{error}</div>}
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
        <button className='primary' disabled={!isFormValid || isSubmitting}>
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
