// create the register page with same design as login page

import {React, useEffect} from 'react'
import { Link,  useNavigate } from "react-router-dom";
import { useState } from 'react'
import { getAuthToken, signup, } from '../../Helpers'
// import { useHistory } from 'react-router-dom'
// import { useAuth } from '../../Contexts/AuthContext'

const Register = () => {
    const [firstName, setName] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    // const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // const history = useHistory()

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
        });


    async function handleSubmit(e) {
        e.preventDefault()

        if (password !== passwordConfirm) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            // await signup(email, password)
            const signUp = await signup( {email, password, firstName, username} )
            if (signUp.success) {
              return navigate('/')
            }
            else {
              return setError(signUp.message)
            }
            // history.push('/')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)
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
          {/* add TechMarket text */}

          <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={firstName}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="passwordConfirm"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Register