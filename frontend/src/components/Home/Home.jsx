import { useContext, useEffect, useRef, useState } from 'react';
import { Form, Navbar, Nav, Container } from 'react-bootstrap';
import Timer from '../Timer/Timer'
import { AuthContext } from '../../context/AuthContext';

function Home(){

  const {user} = useContext(AuthContext);
  console.log(user);
  
  return (
    <>
      <Timer />
      {user?.nickname}
    </>
  );
}

export default Home;