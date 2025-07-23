import { useEffect, useState } from "react";
import StudyCalendar from "../../components/StudyCalendar/StudyCalendar";
import api from "../../api/api";

function MyStudyCalendar(){
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

    return(
        <StudyCalendar 
            studyRecords={studyRecords}
            date={date}
            setDate={setDate}
            tileColorResolver={tileColorResolver}
        />
    )
}

export default MyStudyCalendar;