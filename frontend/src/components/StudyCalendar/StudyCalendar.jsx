import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './StudyCalendar.css';

function StudyCalendar({ studyRecords, date, setDate, tileColorResolver }) {

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return(
        <Calendar 
            onChange={setDate} 
            value={date} 
            calendarType="gregory"
            tileClassName={( {date, view} )=>{
                if (view === 'month') {
                    const key = formatDate(date);
                    const time = studyRecords[key];

                    return tileColorResolver(time);
                }
            }}
        />
    )
}

export default StudyCalendar;