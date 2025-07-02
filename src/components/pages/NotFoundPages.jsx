import { Link, useNavigate } from "react-router";

const NotFoundPages = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl font-bold">Page Not Found.</p>
    </div>
  );
};

export default NotFoundPages;
