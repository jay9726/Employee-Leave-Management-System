import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      <div className="relative z-10 text-center px-4">
        <div className="mb-8">
          <h1
            className="text-9xl font-black bg-linear-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-2 animate-pulse"
            style={{ lineHeight: '1' }}
          >
            404
          </h1>
          <div className="h-1 w-32 bg-linear-to-r from-red-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the digital void.
        </p>
        <button
          className="relative bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          onClick={() => navigate(-1)}
        >
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full hover:translate-x-[-200%] transition-transform duration-1000"></span>
          <span className="relative flex items-center gap-2">
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 hover:-translate-x-1`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </span>
        </button>
        <div className="mt-6">
          <a
            href="/home"
            className="text-blue-600 hover:text-indigo-600 font-medium transition-colors duration-300 hover:underline"
          >
            Or return to homepage →
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white/50 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default ErrorPage