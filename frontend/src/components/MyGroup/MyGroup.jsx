import { useEffect, useState } from 'react';
import GroupList from '../GroupList/GroupList';
import api from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../store/modalSlice';
import style from './MyGroup.module.css';

function MyGroup() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [myGroups, setMyGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchMyGroups = async () => {
      const res = await api.get(`/groups/my`, {
        params: {userId: user.id}
      });
      const allGroups = res.data;
      
      //내가 만든 그룹
      const myGroups = allGroups.filter(group => group.createUser === user.id);
      //내가 참여중인 그룹
      const joinedGroups = allGroups.filter(group => group.createUser !== user.id);
      setMyGroups(myGroups);
      setJoinedGroups(joinedGroups);
    };

    fetchMyGroups();
  }, [user]);

  function loginCheck(){
    if(!user){
      dispatch(openModal());
    }else {
      navigate('/groupCreate');
    }
  }

  return (
    <div className='wrap'>
      <div className={style.myGroupTop}>
        <h4>내가 만든 그룹</h4>
        <button onClick={()=>loginCheck()}> + 그룹 만들기</button>
      </div>
      <GroupList groups={myGroups} />

      <h4 style={{textAlign:'left'}}>참여 중인 그룹</h4>
      <GroupList groups={joinedGroups} />
    </div>
  );
}

export default MyGroup;
