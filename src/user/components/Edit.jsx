import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { server_url } from "../../services/server_url";
import { toast, ToastContainer } from "react-toastify";
import { editUserAPI } from "../../services/allAPI";
import { useNavigate } from "react-router-dom";

function Edit() {
  const [offCanvas, setOffCanvas] = useState(false);
 const navigate=useNavigate()
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cpassword: "",
    bio: "",
    role: "",
    picture: "",
    id: "",
  });
  const [existingImage, setExistingImage] = useState("");
  const [preview, setPreview] = useState("");
  const [pswdMatch, setPswdMatch] = useState(true);
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUserDetails({
        ...userDetails,
        username: user.username,
        bio: user.bio,
        role: user.role,
        id: user._id,
      });
      setExistingImage(user.picture);
    }
  }, []);
  // console.log(userDetails);
  const handleImageUpload = (e) => {
    setUserDetails({ ...userDetails, picture: e.target.files[0] });
    const url = URL.createObjectURL(e.target.files[0]);
    setPreview(url);
  };

  const checkPswdMatch=(data)=>{
    setUserDetails({...userDetails,cpassword:data})
    userDetails.password==data?setPswdMatch(true):setPswdMatch(false)
  }

  const handleUpdateUser=async()=>{
    const{username,
    password,
    cpassword,
    bio,
    role,
    picture,
    id}=userDetails
    if(!username||!password||!cpassword||!bio||!picture){
      toast.info("please fill the form completely")
    }else if(pswdMatch){
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Authorization":`Bearer ${token}`
        }
        const reqBody=new FormData()
        for(let key in userDetails){
          if(key!='picture'){
            reqBody.append(key,userDetails[key])
          }else{
            preview?reqBody.append("picture",picture)
            :reqBody.append("picture",existingImage)
          }
        }
        const result=await editUserAPI(id,reqBody,reqHeader)
        if(result.status==200){
          toast.success("user profile updated")
          setTimeout(() => {
            sessionStorage.clear()
            navigate('/login')

          }, 2000);
        }else{
          console.log(result);
          toast.error("something went wrong")
          
        }
      }
    }else{
      toast.warning("operation failed!!! Password mismatch")
    }
  }

  const handleReset=()=>{
    const user=JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({username:user.username,bio:user.bio,password:"",cpassword:""})
    setExistingImage(user.picture)
    setPreview("")
  }
  return (
    <div>
      <button
        onClick={() => setOffCanvas(true)}
        className="text-blue-600 border rounded border-blue-600 p-3 flex items-center hover:bg-blue-600 hover:text-white"
      >
        <FaPen className="me-2" />
        Edit
      </button>
      {offCanvas && (
        <div>
          <div className="fixed inset-0 bg-gray-500/75 w-full h-full"></div>
          <div className="bg-white h-full w-90 z-50 fixed top-0 left-0">
            {/* offcanvas head */}
            <div className="bg-black text-white px-3 py-4 flex justify-between text-2xl">
              <h1>Update User Profile</h1>
              <FaX onClick={() => setOffCanvas(false)} />
            </div>
            {/* body */}
            <div className="flex justify-center items-center flex-col my-5">
              <label htmlFor="userProfile">
                <input
                  onChange={(e) => handleImageUpload(e)}
                  type="file"
                  id="userProfile"
                  hidden
                />

                {existingImage == "" ? (
                  //withoutImage
                  <img
                    className="z-52"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    src={
                      preview
                        ? preview
                        : "https://cdn1.iconfinder.com/data/icons/interaction-18/70/profile__account__user__upload__male-1024.png"
                    }
                    alt="profile"
                  />
                ) : //google image
                existingImage.startsWith(
                    "https://lh3.googleusercontent.com/",
                  ) ? (
                  <img
                    className="z-52"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    src={preview ? preview : existingImage}
                    alt="profile"
                  />
                ) : (
                  //uploaded image
                  <img
                    className="z-52"
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    src={
                      preview
                        ? preview
                        : `${server_url}/uploads/${existingImage}`
                    }
                    alt="profile"
                  />
                )}

                <button
                  className="bg-blue-300 z-53 fixed text-white py-2 px-3 rounded"
                  style={{ marginLeft: "75px", marginTop: "-20px" }}
                >
                  <FaPen />
                </button>
              </label>
              <div className="mt-10 mb-3 w-full px-5">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                />
              </div>
              <div className=" mb-3 w-full px-5">
                <input
                value={userDetails.password}
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, password: e.target.value })
                  }
                />
              </div>
              <div className=" mb-3 w-full px-5">
                <input
                value={userDetails.cpassword}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    checkPswdMatch(
                      e.target.value,
                    )
                  }
                />
              </div>
              {!pswdMatch && 
                <div className="text-red-600 mb-3 w-full px-5 text-xs font-bold">
                  confirm password must be match with new password
                </div>
              }
              <div className=" mb-3 w-full px-5">
                <textarea
                  type="text"
                  placeholder="Bio"
                  className="w-full border border-gray-300 p-2 rounded"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, bio: e.target.value })
                  }
                  value={userDetails.bio}
                />
              </div>
              <div className="flex justify-end  w-full px-5 mt-5">
                <button onClick={handleReset} className="bg-yellow-600 text-white px-3 py-2 rounded">
                  RESET
                </button>
                <buttonl onClick={handleUpdateUser} className="bg-green-600 ms-5 text-white px-3 py-2 rounded">
                  UPDATE
                </buttonl>
              </div>
            </div>
          </div>
        </div>
      )}
                  <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      
    </div>
  );
}

export default Edit;
