import { FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';

const OAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/facebook`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/github`;
  };

  return (
    <div className="mt-6">
      <p className="text-center text-gray-600 mb-4">Or sign in with</p>
      <div className="flex justify-center gap-4">
        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          <FaGoogle />
        </button>

        {/* Facebook Button */}
        <button
          onClick={handleFacebookLogin}
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          <FaFacebook />
        </button>

        {/* GitHub Button */}
        <button
          onClick={handleGithubLogin}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition duration-300"
        >
          <FaGithub />
        </button>
      </div>
    </div>
  );
};

export default OAuth;
