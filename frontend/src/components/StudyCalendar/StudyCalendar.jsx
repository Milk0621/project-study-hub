import { useEffect, useState } from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './StudyCalendar.css';
import api from "../../api/api";
import { useParams } from "react-router-dom";

function StudyCalendar() {
    const { id: groupId } = useParams();
    const [date, setDate] = useState(new Date());
    const [rankings, setRankings] = useState([]);
    const [studyRecords, setStudyRecords] = useState({});

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(()=>{
        const fetchStudyRecords = async () => {
            try{
                const res = await api.get(`/study-times/group/${groupId}/max`);
                setStudyRecords(res.data);
            } catch(err) {
                console.log("공부 기록 불러오기 실패", err);
                setStudyRecords({});
            }
        }
        fetchStudyRecords();
    }, [groupId])

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const res = await api.get(`/study-times/study-rank`, {
                    params: {
                        groupId,
                        date: formatDate(date),
                    }
                });
                setRankings(res.data);
            } catch (err) {
                setRankings([]); // 기록 없으면 빈 배열
            }
        };
        fetchRanking();
    }, [date, groupId]);

    const formatSeconds = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}:${mins}:${secs}`;
    };

    return(
        <div className="wrap">
            <Calendar 
                onChange={setDate} 
                value={date} 
                calendarType="gregory"
                tileClassName={( {date, view} )=>{
                    if (view === 'month') {
                        const key = formatDate(date);
                        const time = studyRecords[key];

                        if (time === undefined) return null;
                        if(time >= 43200) return 'calendar-color4';
                        if(time >= 21600) return 'calendar-color3';
                        if(time >= 10800) return 'calendar-color2';
                        if(time >= 3600) return 'calendar-color1';
                        return 'calendar-color0';
                    }
                }}
            />
            <div className="ranking-box">
                <span>{formatDate(date)}</span>
                <h4>공부 시간 랭킹</h4>
                {rankings.length > 0 ? (

                        rankings.map((r, index) => (
                            <p key={index}>
                                👑 {r.nickname} - {(formatSeconds(r.studyTime))}
                            </p>
                        ))

                ) : (
                    <p>기록 없음</p>
                )}
            </div>
        </div>
    )
}

export default StudyCalendar;