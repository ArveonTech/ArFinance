import { Link, useNavigate } from "react-router";

const NotFoundPages = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl">Page Not Found.</p>
      <button className="w-20 py-2 bg-green-800 mt-5 text-white rounded-2xl">
        <Link to={navigate(-1)}>Back</Link>
      </button>
    </div>
  );
};

export default NotFoundPages;
