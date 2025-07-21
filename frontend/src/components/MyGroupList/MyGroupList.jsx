import style from './MyGroupList.module.css';

function MyGroupList({ groups, onClickGroup }) {
  return (
    <div>
      {groups.map(group => (
        <div key={group.id} className={style.groupListBg} onClick={() => onClickGroup(group.id)}>
          <h5 style={{fontWeight: '600'}}> {group.groupName} </h5>
          <div>
            만든 사람: {group.createUser} | 인원 수: {group.participantCount}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyGroupList;