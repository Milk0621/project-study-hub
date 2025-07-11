import { useContext } from 'react';
import Timer from '../Timer/Timer'
import { useSelector } from 'react-redux';
import style from './Home.module.css';
import GroupList from '../GroupList/GroupList';

function Home(){

  const user = useSelector((state) => state.user.user);
  
  return (
    <>
      <Timer />
      <div className={style.groupList}>
        <div className={style.groupListTop}>
          <h4 style={{margin: '0'}}>그룹 목록</h4>
          <button> + 그룹 만들기</button>
        </div>
        <GroupList />
      </div>
    </>
  );
}

export default Home;