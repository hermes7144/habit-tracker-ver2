export default function CardWrapper({ children }) {
  return <div className={`w-full min-h-[270px]  lg:w-4/12 px-2 shadow-lg rounded`}>{children}</div>;
}
