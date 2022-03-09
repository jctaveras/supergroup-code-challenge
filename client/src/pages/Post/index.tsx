import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../generated/graphql";

// import './styles.css';

interface FormValues {
  url: string;
  description: string;
}


export default function Post() {
  const [post, { loading }] = useCreatePostMutation();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const postFields = [
    {
      label: 'URL',
      name: 'text',
      placeholder: 'https://test.com',
      type: 'text',
      validation: register('url', {
        required: true,
      })
    },
    {
      label: 'Description',
      name: 'description',
      placeholder: 'Description',
      type: 'text',
      validation: register('description', {
        required: true,
      })
    }
  ];

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await post({ variables: { ...formData } });
      navigate('/', { replace: true });
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
        {postFields.map(({ label, name, placeholder, type, validation }) => {
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
        <button>Post</button>
      </form>
    </div>
  );
}
