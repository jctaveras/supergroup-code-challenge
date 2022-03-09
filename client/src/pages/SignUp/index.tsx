import React from "react";
import { useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../consts";
import { useDispatch } from "../../context/globa-context";
import { useSignUpMutation } from "../../generated/graphql";

import './styles.css';

interface FormValues {
  email: string;
  password: string;
}


export default function SignUp() {
  const dispatch = useDispatch();
  const [shouldReadirect, setShouldRedirect] = React.useState(false);
  const [signup, { data, loading }] = useSignUpMutation();
  const { handleSubmit, register } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const signUpFields = [
    {
      label: 'Email',
      name: 'email',
      placeholder: 'johndoe@example.com',
      type: 'email',
      validation: register('email', {
        required: true,
      })
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: '********',
      type: 'password',
      validation: register('password', {
        required: true,
      })
    }
  ];

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const data = await signup({ variables: { ...formData } });
      const payload = {
        token: data.data?.signup.token!,
      };
  
      dispatch({
        type: 'CURRENT_USER_FETCHED',
        payload
      });

      localStorage.setItem(AUTH_TOKEN, payload.token);

      setShouldRedirect(true);    
    } catch (error) {
      console.error(error);
    }
  });

  if (loading) {
    return (
      <div className="screen-center">
        <Bars />
      </div>
    );
  }

  return (
    <div className="screen-center">
      <form onSubmit={onSubmit}>
        {signUpFields.map(({ label, name, placeholder, type, validation }) => {
          return (
            <React.Fragment key={name}>
              <label className="input-field-label">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                {...validation}
              />
            </React.Fragment>
          );
        })}
        <button>Sign Up</button>
      </form>
      {shouldReadirect && <Navigate to="/" />}
    </div>
  );
}
