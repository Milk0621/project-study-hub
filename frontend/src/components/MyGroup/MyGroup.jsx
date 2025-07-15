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
      const res = await api.get(`/groups/my?userId=${user.id}`);
      setMyGroups(res.data);
    };

    const fetchJoinedGroups = async () => {
      const res = await api.get(`/groups/joined?userId=${user.id}`);
      setJoinedGroups(res.data);
    };

    fetchMyGroups();
    fetchJoinedGroups();
  }, [user]);

  return (
    <div>
      <h2>내가 만든 그룹</h2>
      <GroupList groups={myGroups} />

      <h2>참여 중인 그룹</h2>
      <GroupList groups={joinedGroups} />
    </div>
  );
}

export default MyGroup;
