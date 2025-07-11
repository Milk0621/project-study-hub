import style from './GroupList.module.css';

function GroupList(props){
  return(
    <div className={style.groupListBg}>
      <span className={style.groupInfo}> 홍길동 · 조회 90 · 2025-07-11</span>
      ★☆
      <h5 style={{fontWeight: '600'}}>취준 스터디원 모집합니다 (온라인)</h5>
      <p>스터디 소개 꾸준한 루틴과 집중력을 함께 지켜가며, 각자 취업 준비를 성실하게 이어가는 스터디입니다. 함께 모여 서로에게 자극을 주고 받으며 취업에 골인해보아요! 성실히! 열심히! 꾸준히! 하기로 약속~~</p>
      <span className={style.hashTag}>개발자</span><span className={style.hashTag}>취업</span>
    </div>
  )
}

export default GroupList;