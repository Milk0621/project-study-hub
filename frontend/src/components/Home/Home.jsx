import { useContext, useEffect, useState } from 'react';
import Timer from '../Timer/Timer'
import { useDispatch, useSelector } from 'react-redux';
import style from './Home.module.css';
import GroupList from '../GroupList/GroupList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { openModal } from '../../store/modalSlice';
import api from '../../api/api';

function Home(){
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [select, setSelect] = useState('');
  const [searchParams] = useSearchParams();
  useEffect(()=>{
    const category = searchParams.get("category")
    if(category) setSelect(category);
  }, [searchParams]);
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    if(value){
      navigate(`/?category=${value}`);
    } else {
      navigate(`/`);
    }
  }

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
          <button onClick={()=>loginCheck()}> + 그룹 만들기</button>
          <div>
            <select value={select} onChange={(e)=>handleSelectChange(e)}>
              <option value="">전체</option>
              <option value="취업">취업</option>
              <option value="학업">학업</option>
              <option value="자격증">자격증</option>
              <option value="운동">운동</option>
              <option value="게임">게임</option>
              <option value="기타">기타</option>
            </select>
            <input type="text" placeholder='검색어를 입력하세요.'/>
            <button>검색</button>
          </div>
        </div>
        <GroupList groups={groups} category={select}/>
      </div>
    </>
  );
}

export default Home;