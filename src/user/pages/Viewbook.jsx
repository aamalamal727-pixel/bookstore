import React, { useEffect, useState } from "react";
import { FaEye, FaCamera } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { makePaymentAPI, viewBookAPI } from "../../services/allAPI";
import { server_url } from "../../services/server_url";
import {loadStripe} from '@stripe/stripe-js';

function Viewbook() {
  const [showModal, setShowModal] = useState(false);
  const {id}=useParams()
  const [book,setBook]=useState({})

useEffect(()=>{
  viewBooks()
},[])

  const viewBooks=async()=>{
    const token=sessionStorage.getItem("token")
    const reqHeader = {
          Authorization: `Bearer ${token}`,
        };
        const result = await viewBookAPI(id, reqHeader);
        if (result.status == 200) {
          setBook(result.data);
          
        } else {
          console.log(result);
        }
  }
  console.log(book);
  
  const makePayment=async()=>{
    const stripe = await loadStripe('pk_test_51TPFikQqIA5ClcFY03IuyFNtry2NjHVBtCX8ALdiIN24vr5gNOyu8iy8r4maCmLxPVmiMWXYodtIJKzZndurox0P00gBhXpc7t');
    // console.log(stripe);
          const token=sessionStorage.getItem("token")

    if(token){

        const reqHeader={
          "Authorization":`Bearer ${token}`
        }
        const result=await makePaymentAPI(id,reqHeader)
        console.log(result.data);
        const{checkOutURL}=result.data
        window.location.href=checkOutURL
        
      }else{
        console.log("error");
        
      }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-start py-10">
      {/* Main Card */}
      <div className="w-[90%] bg-white shadow-md rounded-lg p-6 flex gap-8 relative">
        {/* Left - Image */}
        <div className="w-62.5">
          <img
            src={book?.imageUrl}
            alt="book"
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Right Content */}
        <div className="flex-1 relative">
          {/* Eye Icon */}
          <FaEye
            onClick={() => setShowModal(true)}
            className="absolute right-2 top-2 text-gray-600 cursor-pointer"
          />

          {/* Title */}
          <h1 className="text-2xl font-semibold">{book?.title}</h1>
          <p className="text-blue-600 text-sm mb-4">{book?.author}</p>

          {/* Info */}
          <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 mb-4">
            <p>
              <span className="font-medium">Publisher:</span> {book?.publisher}
            </p>
            <p>
              <span className="font-medium">Language:</span> {book?.language}
            </p>

            <p>
              <span className="font-medium">Seller Mail:</span> {book?.sellerMail}
            </p>
            <p>
              <span className="font-medium">Pages:</span> {book?.pages}
            </p>

            <p>
              <span className="font-medium">Real Price:</span> ${book?.price}
            </p>
            <p>
              <span className="font-medium">ISBN:</span> {book?.isbn}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {book?.abstract}
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              ⬅ Back
            </button>
            <button onClick={makePayment} className="bg-green-600 text-white px-4 py-2 rounded-md">
              Buy $23
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-[60%] rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-[#0f172a] text-white flex justify-between items-center px-4 py-2">
              <h2 className="text-sm font-medium">Book Photos</h2>
              <IoClose
                onClick={() => setShowModal(false)}
                className="cursor-pointer text-lg"
              />
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-4 text-sm">
                <FaCamera />
                <p>Camera click of the book in the hand of seller</p>
              </div>

              <div className="flex gap-6 justify-center">
                {book?.uploadImg?.length>0?book.uploadImg.map((filename,index)=>(<img key={index}
                  src={`${server_url}/uploads/${filename}`}
                  alt="book1"
                  className="w-62.5 h-50 object-cover rounded-md"
                />)):<p>Nothing to Display</p>}
               
              </div>
            </div>
            <button onClick={()=>setShowModal(false)} className="text-blue-400">close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewbook;
