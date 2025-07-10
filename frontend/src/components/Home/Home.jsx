import { useContext } from 'react';
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