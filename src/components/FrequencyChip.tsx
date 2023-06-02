export default function FrequencyChip({ frequency }) {
  const week = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <>
      <div className='flex justify-center gap-[2px]'>
        {frequency &&
          week.map((day, index) => (
            <div key={index} className={'flex items-center justify-center text-sm md:text-lg w-5 h-5 md:w-10 md:h-10 rounded-full font-bold ' + (frequency.includes(index) ? 'bg-brand text-white' : 'bg-gray-300')}>
              {day}
            </div>
          ))}
      </div>
    </>
  );
}
