import React, { useEffect, useState } from "react";
import { CiTwitter, CiUser } from "react-icons/ci";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { server_url } from "../../services/server_url";

function Header() {
  const [listStatus, setListStatus] = useState(false);

  const[token,setToken]=useState("")
  const[dp,setDp]=useState("")
  const[dropDown,setDropDown]=useState(false)
  const navigate=useNavigate()

  useEffect(()=>{
    if(sessionStorage.getItem("token")&&sessionStorage.getItem("user")){
      const userToken=sessionStorage.getItem("token")
      setToken(userToken)
      const user=JSON.parse(sessionStorage.getItem("user"))
      setDp(user.picture)
    }
  },[token])

  const logout=()=>{
    sessionStorage.clear()
    setToken("")
    setDp("")
    setDropDown(false)
    navigate('/')
  }
  return (
    <>
      <div className="grid grid-cols-3 p-3">
        {/* logo */}
        <div className="flex items-center">
          <img className="rounded-xl"
            width={"70px"}
            height={"100px"}
            src="https://i.pinimg.com/originals/2a/64/a0/2a64a0ebe6cf1ee2ac27878f920e46b2.gif"
            alt=""
          />
          <h1 className="text-2xl font-bold ms-2 md:hidden ">BOOKSTORE</h1>
        </div>
        {/* title */}
        <div className="md:flex justify-center items-center hidden">
          <h1 className="text-3xl font-bold">BOOK STORE</h1>
        </div>
        {/* login block */}
        <div className="md:flex justify-end items-center hidden">
          <FaInstagram />
          <CiTwitter />
          <FaFacebookF />
         { !token?<Link to={"/login"}>
            <button className="border border-black flex rounded px-3 py-2 ms-3 hover:bg-black hover:text-white">
              <CiUser />
              Login
            </button>
          </Link>
          :
          <div className="relative inline-block text-left">
            <button onClick={()=>setDropDown(!dropDown)} className="w-full bg-white px-3 py-2  shadow-xs hover:bg-gray-50">
                <img width={'40px'} height={'40px'} style={{borderRadius:'50%'}} className="mx-2" src={
                              dp==""? "https://cdn-icons-png.flaticon.com/512/149/149071.png":dp.startsWith(
                                    "https://lh3.googleusercontent.com/")?dp:`${server_url}/uploads/${dp}`
                            }alt="user" />
            </button>
            {dropDown&&<div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
              <div className="py-1">
                <Link className="block px-4 py-2 text-sm text-gray-700" to={'/profile'}>  Profile </Link>
                <button onClick={logout}  className="block px-4 py-2 text-sm text-gray-700"> Logout</button>
              </div>
            </div>}
          </div>}
        </div>
      </div>
      <nav className="w-full p-3 bg-black text-white md:flex justify-center items-center">
        {/* menu bar and login */}
        <div className="flex justify-between items-center text-2xl md:hidden text-white">
          <button>
            <FaBarsProgress className="text-white" />
          </button>
          {/* login link */}
         {!token? <Link to={"/login"}>
            <button className="border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white">
              <CiUser />
              Login
            </button>
          </Link>
          :
          <div className="relative inline-block text-left">
            <button onClick={()=>setDropDown(!dropDown)} className="w-full  px-3 py-2 bg-gray-500 shadow-xs hover:bg-gray-50 rounded">
              <img
                width={"40px"}
                height={"40px"}
                style={{ borderRadius: "50%" }}
                className="mx-2"
                src={
                              dp==""? "https://cdn-icons-png.flaticon.com/512/149/149071.png":dp.startsWith(
                                    "https://lh3.googleusercontent.com/")?dp:`${server_url}/uploads/${dp}`
                            }
                alt="user"
              />
            </button>
            {dropDown&&<div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
              <div className="py-1">
                <Link
                  className="block px-4 py-2 text-sm text-gray-700"
                  to={"/profile"}
                >
                  {" "}
                  Profile{" "}
                </Link>
                <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700">
                  {" "}
                  Logout
                </button>
              </div>
            </div>}
          </div>}
        </div>
        <ul
          className={
            listStatus
              ? "flex flex-col"
              : "md:flex justify-center items-center hidden gap-5"
          }
        >
          <li className="md:mx-4 mt-3 md:mt-0">
            <Link to={"/"}>HOME</Link>
          </li>
          <li className="md:mx-4 mt-3 md:mt-0">
            <Link to={"/all-books"}>BOOKS</Link>
          </li>
          <li className="md:mx-4 mt-3 md:mt-0">
            <Link to={"/careers"}>CAREERS</Link>
          </li>
          <li className="md:mx-4 mt-3 md:mt-0">
            <Link to={"/contact"}>CONTACT</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
