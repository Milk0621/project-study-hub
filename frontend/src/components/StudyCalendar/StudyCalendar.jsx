import { useState } from "react"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './StudyCalendar.css';

function StudyCalendar() {
    const [date, setDate] = useState(new Date());

    const studyRecords = {
        '2025-07-20': 1800,  // 0.5시간
        '2025-07-21': 7200,  // 2시간
        '2025-07-22': 10800, // 3시간
    };

    const formatDate = (date) => date.toISOString().split('T')[0];

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

                        if(!time) return null;
                        if(time >= 10800) return 'study-heavy';
                        if(time >= 3600) return 'study-medium';
                        return 'study-light';
                    }
                }}
            />
        </div>
    )
}

export default StudyCalendar;