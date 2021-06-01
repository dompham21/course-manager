import { useForm } from 'react-hook-form';
import FormItem from '@components/FormItem';
import { useRef, useState } from 'react';
import styles from './index.module.css';

export interface LoginFormData {
  username: string;
  password: string;
  retypedPassword: string;
  email: string;
  fullname: string;
}

export default function LoginModal() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<LoginFormData>();
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const password = useRef({});
  password.current = watch('password', '');

  const submitForm = async (data: LoginFormData) => {
    console.log(data);
    // TODO: call api to server
  };

  return (
    <>
      <div className={styles.blurBg} />
      <form id={styles.registerForm} onSubmit={handleSubmit(submitForm)}>
        <div className={styles.formHeader}>Login</div>
        <FormItem
          isFirstVisit={isFirstVisit}
          labelName="Username"
          name="username"
          placeholder="Enter your username"
          inputId="usernameInput"
          type="text"
          error={errors.username}
          register={register('username', {
            required: 'Username is required',
            minLength: {
              value: 8,
              message: 'Username must have at least 8 characters'
            }
          })}
        />
        <FormItem
          isFirstVisit={isFirstVisit}
          labelName="Password"
          name="password"
          placeholder="Enter your password"
          inputId="passwordInput"
          type="password"
          error={errors.password}
          register={register('password', {
            required: 'Password is required',
          })}
        />
        <input
          className={styles.submitButton}
          onClick={() => {
            setIsFirstVisit(false);
          }}
          type="submit"
          value="Login"
        />
      </form>
    </>
  );
}