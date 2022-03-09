import React from "react";
import { useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
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

  const onSubmit = handleSubmit((formData) => {
    signup({ variables: { ...formData } })
      .then(() => {
        const payload = {
          token: data?.signup.token!,
          user: {
            id: data?.signup.user.id!,
            email: data?.signup.user.email!
          }
        };

        dispatch({
          type: 'CURRENT_USER_FETCHED',
          payload
        });

        setShouldRedirect(true);
      })
      .catch((error) => {
        console.error(error);
      });
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
        <button>Sign Up</button>
      </form>
      {shouldReadirect && <Navigate to="/" />}
    </div>
  );
}
