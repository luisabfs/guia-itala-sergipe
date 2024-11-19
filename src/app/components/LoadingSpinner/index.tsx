export default function LoadingSpinner() {
  return (
    <div className='flex flex-1 justify-center items-center'>
      <div className="w-16 h-16 border-4 border-t-transparent border-green-900 rounded-full animate-spin" />
    </div>
  );
}
