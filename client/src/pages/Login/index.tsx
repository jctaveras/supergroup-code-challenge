import React from "react";
import { Bars } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch } from "../../context/globa-context";
import { useLoginMutation } from "../../generated/graphql";

import './styles.css';
import { AUTH_TOKE } from "../../consts";

interface FormValues {
  email: string;
  password: string;
}


export default function Login() {
  const dispatch = useDispatch();
  const [shouldReadirect, setShouldRedirect] = React.useState(false);
  const [login, { loading }] = useLoginMutation();
  const { handleSubmit, register } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const loginFields = [
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
      const data = await login({ variables: { ...formData } });
      const payload = {
        token: data.data?.login.token!,
      };
  
      dispatch({
        type: 'CURRENT_USER_FETCHED',
        payload
      });

      localStorage.setItem(AUTH_TOKE, payload.token);

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
        {loginFields.map(({ label, name, placeholder, type, validation }) => {
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
        <button>Login</button>
      </form>
      {shouldReadirect && <Navigate to="/" />}
    </div>
  );
}
