import React, { useEffect, useState } from "react";
import Adminheader from "../components/Adminheader";
import Adminsidebar from "../components/Adminsidebar";
import { getAllAdminBooksAPI, getAllAdminUsersAPI, getUpdateBookStatusAPI } from "../../services/allAPI";
import { server_url } from "../../services/server_url";
import { toast, ToastContainer } from "react-toastify";

function Admincollection() {
  const [bookListStatus, setBookListStatus] = useState(true);
  const [usersListStatus, setUsersListStatus] = useState(false);


  const[allbooks,setAllBooks]=useState([])
  const[allUsers,setAllUsers]=useState([])

  useEffect(()=>{
      const token=sessionStorage.getItem("token")
       getAllBooks(token)
       getAllUsers(token)
  },[])

  const getAllBooks=async(token)=>{
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    const result=await getAllAdminBooksAPI(reqHeader)
    if(result.status==200){
      setAllBooks(result.data)
    }else{
      console.log(result);
      
    }
  }
  const getAllUsers=async(token)=>{
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    const result=await getAllAdminUsersAPI(reqHeader)
    if(result.status==200){
      setAllUsers(result.data)
    }else{
      console.log(result);
      
    }
  }

const getUpdateBooks=async(bookId)=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    const result=await getUpdateBookStatusAPI(bookId,reqHeader)
    if(result.status==200){
       toast.success("book approved")
       getAllBooks(token)
    }else{
      console.log(result);
      
    }
  }
}




  console.log(allUsers);
  
  return (
    <div>
      <Adminheader />
      <div className="md:grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <Adminsidebar />
        </div>
        <div className="col-span-4 p-10">
          <h1 className="text-3xl text-center font-bold">All Collections</h1>
          {/* tabs */}
          <div className="flex justify-center items-center my-8 font-medium text-lg">
            <p
              onClick={() => {
                setBookListStatus(true);
                setUsersListStatus(false);
              }}
              className={
                bookListStatus
                  ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                  : "p-4 border-b border-gray-200 cursor-pointer"
              }
            >
              Books
            </p>
             <p
              onClick={() => {
                setBookListStatus(false);
                setUsersListStatus(true);
              }}
              className={
                usersListStatus
                  ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                  : "p-4 border-b border-gray-200 cursor-pointer"
              }
            >
              Users
            </p>
          </div>
          {/* contents */}
          {
            bookListStatus&&
            <div className="md:grid grid-cols-4 w-full my-5">
              {/* duplicate card */}
               { allbooks.length>0?allbooks.map((book)=>(<div className="shadow rounded m-4 p-3">
                  <img width={'100%'} height={'300px'} src={book?.imageUrl} alt="book" />
            <div className="flex flex-col justify-center items-center mt-4">
              <p className="text-blue-700 font-bold text-lg">{book?.author}</p>
              <p>{book?.title}</p>
              <p>$ {book?.price}</p>
              {book?.status!="Approved"?<button onClick={()=>getUpdateBooks(book?._id)} className="p-3 rounded border bg-green-700 w-full text-white hover:border-green-600 hover:bg-white hover:text-green-700">Approve</button>:
               <div className="flex justify-end w-full">
                 <img width={'40px'} height={'40px'} src="data:image/webp;base64,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" alt="tick mark" />
               </div>}
              </div>
             
            </div>)):null}

          </div>
          
          }
          {
            usersListStatus&&
            <div className="md:grid grid-cols-3 w-full my-5">
              {/* duplicate card */}
             {allUsers.length>0?allUsers.map((user)=>(<div key={user?._id} className="shadow rounded p-2 m-2 bg-gray-200">
                <p className="text-red-700 font-bold text-md">{user?._id}</p>
                <div className="flex items-center mt-3">
                 {user?.picture?<img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src={user?.picture.startsWith(
                                     "https://lh3.googleusercontent.com/")?user?.picture:`${server_url}/uploads/${user?.picture}`} alt="user" />:
                 <img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src="data:image/png;base64,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" alt="user" />
                 }
                <div className="flex flex-col ml-3 w-full">
                  <p className="text-blue-800 text-lg font-bold">{user?.username}</p>
                  <p>{user?.email}</p>

                 </div>
                </div>

              </div>)):<p>Loading.......</p> }

            </div>
          }
        </div>
      </div>
                  <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      
    </div>
  );
}

export default Admincollection;
