import React, { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../consts";

import './styles.css';

const Header: FunctionComponent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem(AUTH_TOKEN);
  const links = [
    {
      to: '/',
      text: 'Feed',
    },
    {
      to: '/login',
      text: 'Log In',
    },
    {
      to: '/signup',
      text: 'Sign Up',
    }
  ].filter(({ text }) => !(['Sign Up', 'Log In'].includes(text) && token));

  if (token) {
    links.push({ to: '/post', text: 'New Post'});
  }

  const onClick = () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigate('/', { replace: true });
  }

  return (
    <nav>
      {links.map(({ to, text }) => (<Link className="nav-links" key={`${to}-nav`} to={to}>{text}</Link>))}
      {token && <button className="btn-log-out" onClick={onClick}>Log Out</button>}
    </nav>
  );
};

export default Header;