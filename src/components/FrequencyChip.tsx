const WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function FrequencyChip({ frequency }) {
  const className = 'flex items-center justify-center text-sm md:text-lg w-10 h-10 rounded-full font-bold ';
  return (
    <div className='flex justify-center gap-[2px]'>
      {frequency &&
        WEEK.map((day, index) => (
          <div key={index} className={className + (frequency.includes(index) ? 'bg-brand text-white' : 'bg-gray-300')}>
            {day}
          </div>
        ))}
    </div>
  );
}
