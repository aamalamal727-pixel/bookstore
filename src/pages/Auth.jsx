import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { googleloginAPI, loginAPI, registerAPI } from "../services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
function Auth({ register }) {
  const [viewPasswordStatus, setViewPasswordStatus] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  // console.log(userDetails);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userDetails;
    if (username && email && password) {
      try {
        const result = await registerAPI(userDetails);
        console.log(result);
        if (result.status == 200) {
          toast.success("successfully registered");
          setUserDetails({ username: "", email: "", password: "" });
          navigate("/login");
        } else {
          toast.warn("something went wrong");
          setUserDetails({ username: "", email: "", password: "" });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  //login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userDetails;
    if (email && password) {
      const result = await loginAPI(userDetails);
      // console.log(result);
      if (result.status == 200) {
        toast.success("user logined");
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        setUserDetails({ email: "", password: "" });
        setTimeout(() => {
          if (result.data.user.role == "admin") {
            navigate("/admin/home");
          } else {
            navigate("/");
          }
        }, 2000);
      } else if (result.status == 401 || result.status == 404) {
        toast.warning(result.response.data);
        setUserDetails({ email: "", password: "" });
      } else {
        toast.error("something went wrong");
        console.log(result);
      }
    } else {
      toast.info("please fill the form");
    }
  };
  //google login
  const handleGoogleLogin=async(credentialResponse)=>{
    console.log("inside google login");
    console.log(credentialResponse);
    const decode=jwtDecode(credentialResponse.credential)
    console.log(decode.email,decode.name,decode.picture);
    const result=await googleloginAPI({email:decode.email,password:'googlepassword',username:decode.name,picture:decode.picture})
    if(result.status==200){
      toast.success("user logined")
      sessionStorage.setItem("token",result.data.token)
      sessionStorage.setItem("user",JSON.stringify(result.data.user))
      setTimeout(()=>{
        if(result.data.role=="admin"){
          navigate('/admin/home')
        }else{
          navigate('/')
        }
      },2000)
    }else{
      toast.error("something went wrong")
      console.log(result);
      
    }
    
    
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center flex-col bg-[url(https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-bg-center">
        <div className="p-10">
          <h1 className="text-3xl font-bold text-center text-black">
            Book Store
          </h1>
          <div
            style={{ width: "400px" }}
            className="bg-black/55 rounded-4xl text-white p-5 flex flex-col justify-center items-center my-5"
          >
            <div
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              className="border mb-5 flex justify-center items-center "
            >
              <CiUser className="text-3xl" />
            </div>
            <h1 className="text-2xl">{register ? "Register" : "Login"}</h1>
            <form className="my-5 w-full">
              {register && (
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  placeholder="Username"
                  type="text"
                  className="bg-white p-3 w-full rounded placeholder-gray-500 my-5 text-black"
                />
              )}
              <input
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
                placeholder="Email Id"
                type="email"
                className="bg-white p-3 w-full rounded placeholder-gray-500 mb-5 text-black "
              />
              <div className="flex items-center">
                <input
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                  placeholder="Password"
                  type={viewPasswordStatus ? "text" : "password"}
                  className="bg-white mb-5 p-3 w-full rounded placeholder-gray-500 text-black"
                />
                {!viewPasswordStatus ? (
                  <FaEye
                    onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
                    style={{ marginLeft: "-30px" }}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setViewPasswordStatus(!viewPasswordStatus)}
                    style={{ marginLeft: "-30px" }}
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
              <div className="flex justify-between mb-5">
                <p className="text-xs text-orange-300">
                  *Never share your password with others
                </p>
                <button className="text-xs underline">Forget Password</button>
              </div>
              <div className="text-center">
                {register ? (
                  <button
                    type="button"
                    className="bg-green-700 p-2 w-full rounded"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-green-700 p-2 w-full rounded"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                )}
              </div>
              {/* google authentication */}
              {register && 
                <div className="text-center my-5">
                  <p>----------------or----------------</p>
                 <div className="mt-2 flex justify-center items-center w-full">
                   <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      handleGoogleLogin(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                  
                 </div>
                </div>
              }
              <div className="my-5 text-center">
                {register ? (
                  <p className="text-blue-600">
                    Are you Already a user?
                    <Link to={"/login"} className="underline ms-5">
                      Login
                    </Link>
                  </p>
                ) : (
                  <p className="text-blue-600">
                    Are you a New User?
                    <Link to={"/register"} className="underline ms-5">
                      Register
                    </Link>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} theme="colored" />
    </>
  );
}

export default Auth;
