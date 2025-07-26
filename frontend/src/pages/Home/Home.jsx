import { useContext, useEffect, useState } from 'react';
import Timer from '../../components/Timer/Timer'
import { useDispatch, useSelector } from 'react-redux';
import style from './Home.module.css';
import GroupList from '../../components/GroupList/GroupList';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/api';

function Home(){
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('');
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [groups, setGroups] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  //URL 쿼리스트링(category)이 존재할 경우 select 상태에 반영하여 드롭다운 선택값 유지
  useEffect(()=>{
    if(category) setSelect(category);
  }, [searchParams]);

  //드롭다운에서 카테고리 선택 시 상태를 업데이트하고
  //선택된 값에 따라 URL 쿼리 파라미터(category)를 갱신
  //'전체' 선택 시 쿼리 없이 루트 경로('/')로 이동
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelect(value);
    if(value){
      navigate(`/?category=${value}`);
    } else {
      navigate(`/`);
    }
  }

  //
  // const fectchSearch = async () => {
  //   try{
  //     const res = await api.get('/groups/search', {
  //       params: {
  //         search: search,
  //         category: category
  //       }
  //     });
  //     setGroups(res.data);
  //     console.log("검색 결과:", res.data);
  //   }catch (err) {
  //     console.log(err, "검색 실패");
  //   }
  // }
  const fetchGroups = async (page=1) => {
    console.log('search:', search, 'category:', category, 'page:', page);

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
  }

  useEffect(() => {
    fetchGroups();
  }, [category]);

  const handleSearch = () => {
    fetchGroups(1); // 검색 시 첫 페이지로 이동
  };

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
            <button onClick={()=>handleSearch}>검색</button>
          </div>
        </div>
        <GroupList groups={groups} category={select}/>
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