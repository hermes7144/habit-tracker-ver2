export default function HabitFilter({ filters, filter, onFilter }) {
  const handleFilter = (index) => {
    onFilter(index);
  };

  return (
    <ul className='flex justify-around items-center bg-gray-100 p-2 m-2'>
      {filters.map((value, index) => (
        <li key={index}>
          <button
            onClick={() => {
              handleFilter(index);
            }}
            className={`font-bold text-lg hover:opacity-100 text-brand bg-transparent capitalize ${filter === value ? 'opacity-100 after:mt-2 border-b-4 border-gray-500' : 'opacity-60'}`}>
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}
