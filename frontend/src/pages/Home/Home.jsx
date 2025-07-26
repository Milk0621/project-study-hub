import { useEffect, useState } from 'react';
import Timer from '../../components/Timer/Timer'
import style from './Home.module.css';
import GroupList from '../../components/GroupList/GroupList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/api';
import { handleGroupAccess } from '../../utils/groupAccess';
import { useSelector } from 'react-redux';

function Home(){
  const user = useSelector((state)=>state.user.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');           // 검색어 상태
  const [select, setSelect] = useState('');           // 선택된 카테고리
  const [searchParams] = useSearchParams();           // URL 쿼리 파라미터
  const category = searchParams.get("category");      // category 파라미터 추출
  
  const [groups, setGroups] = useState([]);           // 그룹 목록 상태 
  const [totalPages, setTotalPages] = useState(1);    // 전체 페이지 수
  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 번호
  
  //URL에 category 쿼리 파라미터가 있으면 드롭다운 선택값 유지
  useEffect(()=>{
    if(category) setSelect(category);
  }, [searchParams]);

  //드롭다운 카테고리 변경 시 상태 업데이트 및 URL 쿼리 변경
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    navigate(value ? `/?category=${value}` : "/");
  }

  // 그룹 목록 API 호출 (검색어, 카테고리, 페이지 포함)
  const fetchGroups = async (page=1) => {
    try{
      const res = await api.get('/groups/list', {
        params: {
          search: search,
          category: category,
          page: page,
          size: 5
        }
      });
  
      setGroups(res.data.groups);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      console.log(res.data);
    }catch (err){
      console.error('그룹 목록 조회 실패: ', err);
    }
  }

  // category가 변경될 때마다 그룹 목록 재요청
  useEffect(() => {
    fetchGroups();
  }, [category]);

  // 검색 버튼 클릭 시 첫 페이지부터 그룹 목록 요청
  const handleSearch = () => {
    fetchGroups(1);
  };

  // 페이지 버튼 클릭 시 해당 페이지의 그룹 목록 요청
  const handlePageChange = (pageNumber) => {
    fetchGroups(pageNumber);
  };

  return (
    <>
      <Timer />
      <div className="wrap">
        <div className={style.groupListTop}>
          <h4 style={{margin: '0'}}>그룹 목록</h4>
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
            <input type="text" placeholder='검색어를 입력하세요.' onChange={(e)=>setSearch(e.target.value)}/>
            <button onClick={()=>handleSearch()}>검색</button>
          </div>
        </div>
        {/* 그룹 목록 컴포넌트 렌더링 */}
        <GroupList groups={groups} category={select} onGroupClick={(group)=>handleGroupAccess(group, select, navigate, user)}/>

        {/* 페이지네이션 버튼 */}
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              style={{ margin: '0 4px', fontWeight: currentPage === i + 1 ? 'bold' : 'normal' }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;