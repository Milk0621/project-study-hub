import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { addScrap, removeScrap, setScrapList } from '../../store/scrapSlice';
import style from './GroupList.module.css';

function GroupList({groups, category, onGroupClick}){
  const user = useSelector((state)=>state.user.user); // 로그인 사용자 정보
  const scrapList = useSelector((state)=>state.scrap.scrapList); // 스크랩한 그룹 ID 목록
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // 스크랩 토글 기능
  // - 이미 스크랩된 그룹이면 삭제 요청
  // - 스크랩되지 않은 그룹이면 추가 요청
  // - 클릭 이벤트 전파 중단 (상위 onClick 방지)
  const toggleScrap = async (e, groupId) => {
    e.stopPropagation(); // 상위 div 클릭 이벤트(페이지 이동) 차단
    const token = localStorage.getItem("token");

    try{
      if (scrapList.includes(groupId)) {
        // 이미 스크랩되어 있다면 삭제
        await api.delete(`/groups/${groupId}/scrap`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(removeScrap(groupId));
      } else {
        // 스크랩 추가
        await api.post(`/groups/${groupId}/scrap`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(addScrap(groupId));
      }
    } catch (err) {
      console.error("스크랩 토글 실패: ", err);
    }
  }

  // 사용자의 스크랩 목록 조회
  // - 로그인 사용자 정보(user)가 바뀔때마다 최신화
  useEffect(()=>{
    const fetchScraps = async () => {
      try{
        const res = await api.get('/users/me/scraps');
        dispatch(setScrapList(res.data)); // 스크랩 ID 배열을 Redux에 저장
      }catch (err){
        console.error("스크랩 목록 조회 실패: ", err);
      }
    }
    fetchScraps();
  }, [user])

  // 날짜 포맷 (T를 공백으로 변환)
  const formatDate = (date) => date.replace('T', ' ');

  // 클릭 핸들러: onGroupClick이 있으면 실행, 없으면 기본 이동
  const handleClick = (group) => {
    if (onGroupClick) {
      onGroupClick(group);
    } else {
      navigate(`/${group.id}`);
    }
  };

  return(
    <>
      { groups.map((group)=>{
        const scrapped = scrapList.includes(group.id);
        return(
          <div 
            key={group.id} 
            className={style.groupListBg} 
            onClick={() => handleClick(group)}
          >
            <div className={style.groupListTop}>
              {/* 그룹 정보 */}
              <span className={style.groupInfo}> {group.createUser} · 조회 {group.hit} · {formatDate(group.createDate)} </span>

              {/* 스크랩 버튼 (로그인 사용자만 표시) */}
              {user && (
                <button className={style.scrapBtn} onClick={(e)=>toggleScrap(e, group.id)}>
                  {scrapped ? "★" : "☆"}
                </button>
              )}
            </div>

            {/* 그룹 제목/내용/태그 */}
            <h5 style={{fontWeight: '600'}}> {group.groupName} </h5>
            <p className={`${style.contentLineClamp}`}> {group.content} </p>
            <span className={style.hashTag}>{group.tag}</span>
          </div>
        )
      })}
    </>
  )
}

export default GroupList;