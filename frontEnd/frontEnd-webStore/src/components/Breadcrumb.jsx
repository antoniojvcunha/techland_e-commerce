import { Link } from "wouter";

function Breadcrumb({currentPage}) {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center py-10 gap-2">
      <div className="flex gap-4">
        <Link to="/">
          <p className="hover:text-blue-700">Home</p>
        </Link>
        <p>{">"}</p>
        <p>{currentPage}</p>
      </div>
      <h1 className="text-4xl font-bold">{currentPage}</h1>
    </div>
  );
};

export default Breadcrumb;



