import { useContext, useEffect, useRef, useState } from "react";
import { Container ,Row ,Col } from 'react-bootstrap';
import styles from './Timer.module.css';
import { AuthContext } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import api from '../../api/axios';

function Timer(){
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const now = new Date(Date.now() - offset).toISOString(); //createAt
  
  //렌더링 시 데이터베이스에서 공부 시간 꺼내오기
  
  useEffect(()=>{
    if (!user) return;
    
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
      } finally {
        setLoading(false);
      }
    };

    fetchStudyTime();
  }, [user]);

  //로그인 여부에 따른 타이머 실행
  const { openModal } = useModal();
  const handleStart = () => {
    if(!user){
      openModal();
    } else {
      setRunning(true)
    }
  }

  const handleStop = async () => {
    if(!running) return;

    //타이머 멈춤
    setRunning(false);

    if(!user){
      openModal();
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

  //useRef는 리렌더링 없이도 계속 유지되어야 하는 값을 저장하기 위해 사용
  //useRef 없이 만들면 리렌더링이 발생할 때마다 intervalRef가 초기화되므로 클린업 시점에 잘못된 ID를 clear하거나, 메모리 누수 위험
  
  //setInterval로 생성한 타이머 ID를 보관
  //clearInterval() 시 ID가 반드시 정확하게 남아 있어야 함
  //useState로 하면 리렌더링이 불필요하게 발생하므로 useRef가 최적의 선택

  const [time, setTime] = useState(null);
  const intervalRef = useRef(null);
  const [running, setRunning] = useState(false);
  
  const dt = new Date();
  const todayStr = dt.getFullYear() + '년 ' + (dt.getMonth()+1) + '월 ' + dt.getDate() + '일';

  useEffect(()=>{
    if(running){
      intervalRef.current = setInterval(()=>{
        setTime(prev => prev + 1);
      }, 1000)
    }else {
      clearInterval(intervalRef.current); // UX 및 안정성 향상
    }

    return ()=>{
      clearInterval(intervalRef.current); //cleanup
    }
  }, [running])

  //초를 시:분:초로 변경하는 함수
  function formatTime(seconds){
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${hours}:${min}:${sec}`
  }

  return (
    <div className={`${styles.timer} ${!loading ? styles.visible : ''}`}>
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