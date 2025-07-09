import { useEffect, useRef, useState } from "react";
import { Container ,Row ,Col } from 'react-bootstrap';
import styles from './Timer.module.css';

function Timer(){
  //start 누르면 1초마다 시간 증가, stop 누르면 멈춤

  //useRef는 리렌더링 없이도 계속 유지되어야 하는 값을 저장하기 위해 사용
  //useRef 없이 만들면 리렌더링이 발생할 때마다 intervalRef가 초기화되므로 클린업 시점에 잘못된 ID를 clear하거나, 메모리 누수 위험
  
  //setInterval로 생성한 타이머 ID를 보관
  //clearInterval() 시 ID가 반드시 정확하게 남아 있어야 함
  //useState로 하면 리렌더링이 불필요하게 발생하므로 useRef가 최적의 선택

  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const [running, setRunning] = useState(false);
  
  const dt = new Date();
  const today = dt.getFullYear() + '년 ' + (dt.getMonth()+1) + '월 ' + dt.getDate() + '일';

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
    <div className={styles.timer}>
      <Container>
        <Row>
          <Col className={styles.date}>{today}</Col>
        </Row>
        <Row>
          <Col className={styles.time}>{formatTime(time)}</Col>
          <div>
            <button className={styles.startBtn} onClick={()=>{setRunning(true)}}>Start</button>
            <button className={styles.stopBtn} onClick={()=>{setRunning(false)}}>Stop</button>
          </div>
        </Row>
      </Container>
    </div>
  )
}
export default Timer;