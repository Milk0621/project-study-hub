import { useEffect, useState } from 'react';
import GroupList from '../GroupList/GroupList';
import api from '../../api/api';
import { useSelector } from 'react-redux';

function MyGroup() {
  const user = useSelector((state) => state.user.user);
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

  return (
    <div className='wrap'>
      <h4>내가 만든 그룹</h4>
      <GroupList groups={myGroups} />

      <h4>참여 중인 그룹</h4>
      <GroupList groups={joinedGroups} />
    </div>
  );
}

export default MyGroup;
