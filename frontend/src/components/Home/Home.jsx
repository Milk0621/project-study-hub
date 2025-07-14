import { useContext } from 'react';
import Timer from '../Timer/Timer'
import { useDispatch, useSelector } from 'react-redux';
import style from './Home.module.css';
import GroupList from '../GroupList/GroupList';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../store/modalSlice';

function Home(){
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  function loginCheck(){
    if(!user){
      dispatch(openModal());
    }else {
      navigate('/groupCreate');
    }
  }

  return (
    <>
      <Timer />
      <div className={style.wrap}>
        <div className={style.groupListTop}>
          <h4 style={{margin: '0'}}>그룹 목록</h4>
          <button onClick={()=>loginCheck()}> + 그룹 만들기</button>
        </div>
        <GroupList />
      </div>
    </>
  );
}

export default Home;