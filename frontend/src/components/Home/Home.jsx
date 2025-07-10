import { useContext } from 'react';
import Timer from '../Timer/Timer'
import { useSelector } from 'react-redux';

function Home(){

  const user = useSelector((state) => state.user.user);
  
  return (
    <>
      <Timer />
      {user?.nickname}
    </>
  );
}

export default Home;