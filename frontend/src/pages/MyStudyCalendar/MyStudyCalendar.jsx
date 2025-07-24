import { useEffect, useState } from "react";
import StudyCalendar from "../../components/StudyCalendar/StudyCalendar";
import api from "../../api/api";
import { useSelector } from "react-redux";

function MyStudyCalendar(){
    const user = useSelector((state)=>state.user.user);
    const [date, setDate] = useState(new Date());
    const [studyRecords, setStudyRecords] = useState({});

    useEffect(()=>{
        const fetchMyRecords = async () => {
            const res = await api.get('/study-times/myPage/myCalendar');
            setStudyRecords(res.data);
        }
        fetchMyRecords();
    }, []);

    const tileColorResolver = (time) => {
        if (time === undefined) return null;
        if (time >= 43200) return 'calendar-color4';
        if (time >= 21600) return 'calendar-color3';
        if (time >= 10800) return 'calendar-color2';
        if (time >= 3600)  return 'calendar-color1';
        return 'calendar-color0';
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatSeconds = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const pad = (num) => String(num).padStart(2, '0');
        return `${pad(h)}시간 ${pad(m)}분 ${pad(s)}초`;
    };

    return(
        <div className="wrap">
            <StudyCalendar 
                studyRecords={studyRecords}
                date={date}
                setDate={setDate}
                tileColorResolver={tileColorResolver}
            />
            <div style={{padding: '20px 0'}}>
                <span>{formatDate(date)}</span>
                <h4>{user.nickname}님의 공부 시간</h4>
                {
                    studyRecords[formatDate(date)] !== undefined ? (
                        <p>{formatSeconds(studyRecords[formatDate(date)])}</p>
                    ) : (
                        <p>기록이 없습니다.</p>
                    )
                }
            </div>
        </div>
    )
}

export default MyStudyCalendar;