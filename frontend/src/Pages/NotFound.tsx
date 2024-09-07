const NotFound = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#1f1f1f]">
        <div className="flex flex-col items-center border-2 p-8 gap-2 rounded-lg text-xl text-gray-950 bg-slate-100">
            <h1 className="font-mono font-semibold"><span className="text-red-500 font-bold">404</span> - Page Not Found</h1>
            <p className="text-lg font-extralight font-mono">Sorry, the page you are looking for does not exist.</p>
        </div>
    </div>
  );
};

export default NotFound