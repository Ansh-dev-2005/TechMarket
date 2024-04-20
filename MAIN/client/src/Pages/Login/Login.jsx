import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { getAuthToken, signIn } from "../../Helpers";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");


 useEffect(() => {
          if (
            getAuthToken().user && getAuthToken().user
              ? getAuthToken().user.role === "admin"
              : false
          ) {
            return navigate("/dashboard");
          }
          if (
            getAuthToken().user
              ? getAuthToken().user.role === "student"
              : false || getAuthToken().user
              ? getAuthToken().user.role === "readonly"
              : false
          ) {
            return navigate("/");
          }
          if (getAuthToken().user) {
            return navigate("/");
          }
        }

    );

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            // await signup(email, password)
            const signin = await signIn( {email, password} )
            if (signin.success) {
                 console.log(signin);
                //  set cookie signin.token
                document.cookie = `user=${signin.token}`
                document.cookie = `user_id=${signin.dbRes._id}`
              return navigate('/')
              
            }
           
        
            else {
              return setError(signIn.error)
            }
        } catch (error) {
            console.log(error)
        }
    }


    
  return (
    <div>
      <div className=" items-center font-mono">
        {/* add text TechMarket */}
        <Link
          to="/"
          className="absolute main_font text-center m-4 text-3xl font-semibold text-black"
        >
          TechMarket
        </Link>
      </div>
      <div className="flex justify-center items-center h-screen font-mono">
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
            <div className="flex justify-center items-center mt-4">
                <FaUser className="text-5xl text-blue-600" />
            </div>
            {/* show error */}
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <form className="mt-6" onSubmit={handleSubmit} >

            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Your Password"
                className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 rounded-sm text-white hover:bg-blue-500"
            >
              Login
            </button>
          </form>
          <p className="mt-8 text-sm font-light text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
