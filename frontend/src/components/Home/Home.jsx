import { useContext } from 'react';
import Timer from '../Timer/Timer'
import { useSelector } from 'react-redux';
import style from './Home.module.css';
import GroupList from '../GroupList/GroupList';
import { useNavigate } from 'react-router-dom';

function Home(){
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  
  return (
    <>
      <Timer />
      <div className={style.groupList}>
        <div className={style.groupListTop}>
          <h4 style={{margin: '0'}}>그룹 목록</h4>
          <button onClick={()=>navigate('/groupCreate')}> + 그룹 만들기</button>
        </div>
        <GroupList />
      </div>
    </>
  );
}

export default Home;