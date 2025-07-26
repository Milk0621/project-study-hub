import { useEffect, useRef, useState } from "react";
import { Container ,Row ,Col } from 'react-bootstrap';
import styles from './Timer.module.css';
import api from '../../api/api';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../store/modalSlice';

function Timer(){
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  // 현재 날짜 (YYYY-MM-DD) 및 생성일시 (ISO 문자열) 계산
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset).toISOString().slice(0, 10);
  const now = new Date(Date.now() - offset).toISOString();
  
  const [time, setTime] = useState(null); // 초 단위 공부 시간
  const [running, setRunning] = useState(false); // 타이머 실행 여부
  const intervalRef = useRef(null); // setInterval ID 보관
  
  // 오늘 날짜 문자열 (화면 출력용)
  const dt = new Date();
  const todayStr = `${dt.getFullYear()}년 ${dt.getMonth() + 1}월 ${dt.getDate()}일`;
  
  // 렌더링 시 사용자의 오늘 공부시간을 서버에서 불러옴
  useEffect(()=>{
    if (!user) {
      setTime(0);
      return;
    }
    
    const fetchStudyTime = async () => {
      try{
        const res = await api.get("/study-times/latest", {
          params: {
            userId: user.id,
            date: today
          }
        });
        setTime(res.data.seconds);
        console.log("공부 시간 불러오기 성공");
      } catch(err) {
        setTime(0);
        console.log("공부 시간 불러오기 실패", err);
      }
    };

    fetchStudyTime();
  }, [user]);

  // Start 버튼 클릭 시 타이머 실행
  // 로그인 여부에 따른 타이머 실행
  const handleStart = () => {
    if(!user){
      dispatch(openModal());
    } else {
      setRunning(true)
    }
  }

  // Stop 버튼 클릭 시 타이머 종료 및 서버에 시간 저장
  const handleStop = async () => {
    if(!running) return;
    setRunning(false);

    if(!user){
      dispatch(openModal());
      return;
    }

    try {
      await api.post("/study-times", {
        userId: user.id,
        date: today,
        seconds: time,
        createdAt: now
      });
      console.log("공부시간 저장 완료!")
    } catch(err) {
      console.error("공부시간 저장 실패", err);
    }
  };

  // 타이머 동작 제어 (1초마다 time 증가)
  useEffect(()=>{
    if(running){
      intervalRef.current = setInterval(()=>{
        setTime(prev => prev + 1);
      }, 1000)
    }else {
      clearInterval(intervalRef.current); // 타이머 정지
    }

    return ()=>{ clearInterval(intervalRef.current); } // 컴포넌트 언마운트 시 클린업
  }, [running]);

  // 초 단위를 HH:MM:SS 형식으로 포맷팅
  function formatTime(seconds){
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${hours}:${min}:${sec}`
  }

  return (
    <div className={styles.timer}>
      <Container>
        <Row>
          <Col className={styles.date}>{todayStr}</Col>
        </Row>
        <Row>
          <Col className={styles.time}>{formatTime(time)}</Col>
          <div>
            <button className={styles.startBtn} onClick={()=>{handleStart()}}>Start</button>
            <button className={styles.stopBtn} onClick={()=>{handleStop()}}>Stop</button>
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default Timer;