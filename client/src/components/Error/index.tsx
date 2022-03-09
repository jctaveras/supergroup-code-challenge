import React, { FunctionComponent } from "react";

interface ErrorProps {
  message: string;
}

const Error: FunctionComponent<ErrorProps> = ({ message }) => {
  return (
    <div className="hacker-error">
      <p>{message}</p>
    </div>
  );
};

export default Error;
