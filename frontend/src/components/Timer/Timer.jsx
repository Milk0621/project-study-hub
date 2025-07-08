import { useEffect, useRef, useState } from "react";
import { Container ,Row ,Col } from 'react-bootstrap';
import styles from './Timer.module.css';

function Timer(){
  //start 누르면 시간 증가, stop 누르면 멈춤
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const [running, setRunning] = useState(false);

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
          <Col className={styles.date}>2025년 7월 8일</Col>
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