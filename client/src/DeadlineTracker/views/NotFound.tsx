import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/deadline-tracker"
        className="px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
