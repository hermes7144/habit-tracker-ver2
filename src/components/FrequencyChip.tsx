export default function FrequencyChip({ frequency }) {
  const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <>
      <div className='flex my-2'>
        {frequency &&
          week.map((day, index) => (
            <div key={index} className={'flex items-center justify-center w-10 h-10 rounded-full ' + (frequency.includes(String(index)) ? 'bg-brand' : 'bg-gray-300')}>
              {day}
            </div>
          ))}
      </div>
    </>
  );
}
