import Calendar from 'react-calendar';
import '../Calendar.css';

interface CalendarCardProps {
  value?: any;
  onChange?: any;
  tileDisabled?: any;
  tileClassName: any;
}

export default function CalendarCard({ value, onChange, tileDisabled = () => false, tileClassName }: CalendarCardProps) {
  return <Calendar next2Label={null} prev2Label={null} value={value} onChange={onChange} minDetail='month' calendarType='US' tileDisabled={tileDisabled} tileClassName={tileClassName} />;
}
