export default function HabitFrequency({}) {
  const frequencies = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className='flex justify-around'>
      {frequencies.map((frequency) => (
        <div id={frequency} className='flex flex-col items-center'>
          <input type='checkbox' name={frequency} id={frequency} />
          <label htmlFor={frequency}>{frequency}</label>
        </div>
      ))}
    </div>
  );
}
