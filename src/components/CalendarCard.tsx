import moment from 'moment';
import 'moment/locale/fr';
import Calendar from 'react-calendar';
import '../Calendar.css';

export default function CalendarCard({ value, onChange, week }) {
  return (
    <Calendar
      next2Label={null}
      prev2Label={null}
      value={value}
      onChange={onChange}
      minDetail='month'
      calendarType='US'
      tileClassName={({ date }) => {
        const formattedDate = moment(date).format('YYYY-MM-DD');
        if (week.includes(formattedDate)) {
          const isFirstDate = week[0] === formattedDate;
          const isLastDate = week[week.length - 1] === formattedDate;
          const classNames = `highlight${isFirstDate ? ' highlight--first' : ''}${isLastDate ? ' highlight--last' : ''}`;
          return classNames;
        }
      }}
    />
  );
}
