export default function FrequencyChipDetail({ frequency }) {
  const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className='flex justify-center gap-[2px]'>
      {frequency &&
        week.map((day, index) => (
          <div key={index} className={'flex items-center justify-center text-lg w-10 h-10 rounded-full font-bold ' + (frequency.includes(index) ? 'bg-brand text-white' : 'bg-gray-300')}>
            {day}
          </div>
        ))}
    </div>
  );
}
