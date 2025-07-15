import { useContext, useEffect, useState } from 'react';
import Timer from '../Timer/Timer'
import { useDispatch, useSelector } from 'react-redux';
import style from './Home.module.css';
import GroupList from '../GroupList/GroupList';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../store/modalSlice';
import api from '../../api/api';

function Home(){
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);
  
  useEffect(()=>{
    const fetchGroups = async () => {
      const res = await api.get('/groups/list');
      setGroups(res.data);
      console.log(res.data);
    }
    fetchGroups();
  }, [])

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
          {/* <button onClick={()=>loginCheck()}> + 그룹 만들기</button> */}
          <div>
            <input type="text" placeholder='검색어를 입력하세요.'/>
            <button>검색</button>
          </div>
        </div>
        <GroupList groups={groups} />
      </div>
    </>
  );
}

export default Home;