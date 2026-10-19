import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import Edit from "../components/Edit";
import { toast, ToastContainer } from "react-toastify";
import { addBookAPI, getUserProfileBooksAPI, getUserPurchasedAPI, removeBooksAPI } from "../../services/allAPI";
import { server_url } from "../../services/server_url";


function Profile() {
  const [username, setUsername] = useState("");
  const [dp, setDp] = useState("");
  const[userBooks,setUserBooks]=useState([])
  const[purchaseBooks,setPurchaseBooks]=useState([])
  

  useEffect(() => {
    if (sessionStorage.getItem("token") && sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"));
      setUsername(user?.username);
      setDp(user?.picture);
    }
    getUserBooks()
    getUserPurchaseBooks()
  }, []);

  const [sellBookStatus, setSellBookStatus] = useState(true);
  const [bookStatus, setBookStatus] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(false);

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    pages:"",
    imageUrl: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadImg: [],
  });
  const[preview,setPreview]=useState("")
  // console.log(bookDetails);
  const[previewList,setPreviewList]=useState([])
  
const handleImageUpload=(e)=>{
  // console.log(e.target.files[0]);
  const file=e.target.files[0]
  const uploadArray=bookDetails.uploadImg
  uploadArray.push(file)
  setBookDetails({...bookDetails,uploadImg:uploadArray})
  const url=URL.createObjectURL(file)
  setPreview(url)
  const demoPreviewList=previewList
  demoPreviewList.push(url)
  setPreviewList(demoPreviewList)
  
}

const handleUploadBooks=async()=>{
  const{title,
    author,
    pages,
    imageUrl,
    price,
    discountPrice,
    abstract,
    publisher,
    language,
    isbn,
    category,
    uploadImg}=bookDetails
    if(!title||
    !author||
    !pages||
    !imageUrl||
    !price||
    !discountPrice||
    !abstract||
    !publisher||
    !language||
    !isbn||
    !category||
    uploadImg.length==0){
      toast.info("please fill missing fields.....")
    }else{
      const token=sessionStorage.getItem("token")
      if(token){
        const reqHeader={
          "Authorization":`Bearer ${token}`
        }
        const reqBody= new FormData()
        for(let key in bookDetails){
          if(key!='uploadImg'){
            reqBody.append(key,bookDetails[key])
          }else{
            bookDetails.uploadImg.forEach(item=>{
              reqBody.append("uploadImg",item)
            })
          }
        }
        const result=await addBookAPI(reqBody,reqHeader)
        console.log(result);
        if(result.status==200){
          toast.success("Book added")
        }else if(result.status==409){
          toast.warning(result.response.data)
        }else{
          toast.error("something went wrong")
        }
        handleResetForms()
        
      }
    }
}

const handleResetForms=()=>{
  setBookDetails({
    title: "",
    author: "",
    pages:"",
    imageUrl: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    language: "",
    isbn: "",
    category: "",
    uploadImg: []
  })
  setPreview("")
  setPreviewList([])

}

const getUserBooks=async()=>{
  const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    const result=await getUserProfileBooksAPI(reqHeader)
    if(result.status==200){
      setUserBooks(result.data)
    }else{
      console.log(result);
      
    }
  }else{
    console.log("error");
    
  }
}

const getUserPurchaseBooks=async()=>{
   const token=sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    const result=await getUserPurchasedAPI(reqHeader)
    if(result.status==200){
      setPurchaseBooks(result.data)
    }else{
      console.log(result);
      
    }
  }else{
    console.log("error");
    
  }

}

const removeBooks=async(id)=>{
  const token=sessionStorage.getItem('token')
  if(token){
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    const result=await removeBooksAPI(id,reqHeader)
    if(result.status==200){
      toast.success("book details removed")
      getUserBooks()
    }else{
      console.log(result);
      
    }
  }
}


// console.log(userBooks);
console.log(purchaseBooks);


  return (
    <>
      <div>
        <Header />
        <div style={{ height: "200px" }} className="bg-black"></div>
        <div
          style={{
            width: "230px",
            height: "230px",
            borderRadius: "50%",
            marginLeft: "70px",
            marginTop: "-130px",
          }}
          className="bg-white p-3"
        >
          <img
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            src={
              dp==""? "https://cdn-icons-png.flaticon.com/512/149/149071.png":dp.startsWith(
                    "https://lh3.googleusercontent.com/")?dp:`${server_url}/uploads/${dp}`
            }
            alt="profile"
          />
        </div>
        <div className="md:flex justify-between px-20 mt-5">
          <div className="flex items-center">
            <h1 className="font-bold md:text-3xl text-2xl">{username}</h1>
            <FaUserCircle className="text-blue-400 ms-3" />
          </div>
          <Edit />
        </div>
        
      </div>
      <p className="md:px-20 px-5 my-5 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
        distinctio aperiam ex itaque ullam soluta consequuntur eaque culpa sed
        nostrum voluptatum minima molestiae alias, nesciunt non expedita. Quasi,
        accusamus dicta?
      </p>
      {/* tabs */}
      <div className="md:px-40">
        <div className="flex justify-center items-center my-8 font-medium text-lg m-3">
          <p
            onClick={() => {
              setSellBookStatus(true);
              setBookStatus(false);
              setPurchaseStatus(false);
            }}
            className={
              sellBookStatus
                ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                : "p-4 border-b border-gray-200 cursor-pointer"
            }
          >
            Sell Book
          </p>
          <p
            onClick={() => {
              setSellBookStatus(false);
              setBookStatus(true);
              setPurchaseStatus(false);
            }}
            className={
              bookStatus
                ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                : "p-4 border-b border-gray-200 cursor-pointer"
            }
          >
            Book Status
          </p>
          <p
            onClick={() => {
              setSellBookStatus(false);
              setBookStatus(false);
              setPurchaseStatus(true);
            }}
            className={
              purchaseStatus
                ? "text-blue-500 p-4 border-gray-200 border-t border-l border-r rounded cursor-pointer"
                : "p-4 border-b border-gray-200 cursor-pointer"
            }
          >
            Purchase Book History
          </p>
        </div>
      </div>
      {sellBookStatus && (
        <div>
          <div className="p-10 my-20 mx-5 bg-gray-200">
            <div className="text-center text-3xl font-medium">Book Details</div>
            <div className="md:grid grid-cols-2 mt-10 w-full">
              <div className="px-3">
                <div className="mb-3">
                  <input
                    value={bookDetails.title}
                    onChange={e=>setBookDetails({...bookDetails,title:e.target.value})}
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                    value={bookDetails.author}
                    onChange={e=>setBookDetails({...bookDetails,author:e.target.value})}
                    type="text"
                    placeholder="Author"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                  value={bookDetails.pages}
                    onChange={e=>setBookDetails({...bookDetails,pages:e.target.value})}
                    type="text"
                    placeholder="No. of Pages"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                  value={bookDetails.imageUrl}
                    onChange={e=>setBookDetails({...bookDetails,imageUrl:e.target.value})}
                    type="text"
                    placeholder="Image URL"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                  value={bookDetails.price}
                    onChange={e=>setBookDetails({...bookDetails,price:e.target.value})}
                    type="text"
                    placeholder="Price"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                  value={bookDetails.discountPrice}
                    onChange={e=>setBookDetails({...bookDetails,discountPrice:e.target.value})}
                    type="text"
                    placeholder="Discount Price"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                  value={bookDetails.abstract}
                    onChange={e=>setBookDetails({...bookDetails,abstract:e.target.value})}
                    type="text"
                    placeholder="Abstract"
                    rows={"5"}
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
              </div>
              <div className="px-3">
                <div className="mb-3">
                  <input
                  value={bookDetails.publisher}
                    onChange={e=>setBookDetails({...bookDetails,publisher:e.target.value})}
                    type="text"
                    placeholder="Publisher"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                  value={bookDetails.language}
                    onChange={e=>setBookDetails({...bookDetails,language:e.target.value})}
                    type="text"
                    placeholder="Language"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                  value={bookDetails.isbn}
                    onChange={e=>setBookDetails({...bookDetails,isbn:e.target.value})}
                    type="text"
                    placeholder="ISBN"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3">
                  <input
                  value={bookDetails.category}
                    onChange={e=>setBookDetails({...bookDetails,category:e.target.value})}
                    type="text"
                    placeholder="Category"
                    className="w-full p-2 rounded placeholder-gray-400 text-black bg-white"
                  />
                </div>
                <div className="mb-3 flex justify-center items-center mt-10">
                  <label htmlFor="bookImage">
                    <input
                    onChange={e=>handleImageUpload(e)}
                      type="file"
                      name=""
                      id="bookImage"
                      className="hidden"
                    />
                    <img
                      src={preview?preview:"https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"}
                      alt="book"
                      width={"200px"}
                      height={"200px"}
                    />
                  </label>
                </div>
              {preview&&<div className="flex items-center justify-center">
                {
                  previewList?.map((bookImgUrl,index)=>(
                    <img key={index} src={bookImgUrl} width={'70px'} alt="book-img"/>
                  ))
                }
                  {<label htmlFor="bookUpload">
                    <input
                    onChange={e=>handleImageUpload(e)}
                      type="file"
                      name=""
                      id="bookUpload"
                      className="hidden"
                    />
                    <FaPlus className="ms-2"/>
                   
                  </label>}

                </div>}
              </div>
            </div>
            {/* footer */}
            <div className="p-3 w-full flex md:justify-end justify-center mt-8">
              <button onClick={handleResetForms}
                type="button"
                class="text-white bg-red-600 box-border border border-transparent hover:bg-gray-600 p-2 rounded-xl mx-2"
              >
                Reset
              </button>
              <button onClick={handleUploadBooks}
                type="button"
                class="text-white bg-green-700 box-border border border-transparent hover:bg-gray-600 p-2 rounded-xl mx-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {/* book status */}
      {bookStatus && (
        <div className="p-10 my-20 shadow rounded">
          {/* duplicate div according to book */}
          {userBooks.length>0?userBooks.map(book=>(<div className="p-5 rounded mt-4 bg-gray-100">
            <div className="md:grid grid-cols-[3fr_1fr]">
              <div className="px-4">
                <h1 className="text-2xl">{book?.title}</h1>
                <h2 className="text-xl">{book?.author}</h2>
                <h3 className="text-lg text-blue-500">$ {book.discountPrice}</h3>
                <p className="text-justify">{book?.abstract}</p>
                <div className="flex mt-3">
                 {book?.status=='pending'? <img width={'80px'} height={'80px'} src="data:image/jpeg;base64,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" alt="pending" />
                  :book?.status=='approved'?<img
                    width={"80px"}
                    height={"80px"}
                    src="https://pngimg.com/uploads/approved/approved_PNG1.png"
                    alt="approved icon"
                  />
                  :
                  <img
                    width={"120px"}
                    height={"120px"}
                    src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png"
                    alt="sold icon"
                  />}
                </div>
              </div>
              <div className="px-4 mt-4 md:mt-0">
                <img className="w-full" src={book?.imageUrl} alt="book" />
                <div className="mt-4 flex justify-end">
                  <button onClick={()=>removeBooks(book?._id)}
                    className="py-2 px-3 rounded bg-red-600 text-white ms-3
                  hover:bg-white hover:border hover:text-red-600 hover:border-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>)):<p>No book added yet</p>}
        </div>
      )}
      {/* purchased status */}
      {purchaseStatus && (
        <div className="p-10 my-20 shadow rounded">
          {/* duplicate div according to book */}
       { purchaseBooks?.length>0?purchaseBooks?.map(book=>(<div className="p-5 rounded mt-4 bg-gray-100">
            <div className="md:grid grid-cols-[3fr_1fr]">
              <div className="px-4">
                <h1 className="text-2xl">{book.title}</h1>
                <h2 className="text-xl">{book.author}</h2>
                <h3 className="text-lg text-blue-500">$ {book.discountPrice}</h3>
                <p className="text-justify">{book.abstract}</p>
                <div className="flex mt-3">
                  <img
                    width={"120px"}
                    height={"120px"}
                    src="https://static.vecteezy.com/system/resources/previews/023/629/698/non_2x/web-button-icon-purchase-button-free-png.png"
                    alt="purchase"
                  />
                  
                </div>
              </div>
              <div className="px-4 mt-4 md:mt-0">
                <img className="w-full" src={book.imageUrl} alt="book" />
              </div>
            </div>
          </div>)):<p className="text-red-600 text-center fw-bold text-3xl">No Books Purchased Yet!</p>  }
        </div>
      )}
            <ToastContainer position="top-right" autoClose={5000} theme="colored" />

    </>
  );
}

export default Profile;
