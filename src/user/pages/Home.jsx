import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { getHomeBooksAPI } from '../../services/allAPI'
import { searchContext } from '../../ContextAPI/ShareContext'

function Home() {
  // const[searchKey,setSearchKey]=useState("")
  const { searchKey, setSearchKey }=useContext(searchContext)
  const navigate=useNavigate()
  const[homeBooks,setHomeBooks]=useState([])
  useEffect(()=>{
    getHomeBooks()
  },[])
  const handleSearch=()=>{
    if(!searchKey){
      toast.warning("Please input book title here!")
    }else if(!sessionStorage.getItem("token")){
      toast.warning("Please Login!")
      setTimeout(()=>{
        navigate('/login')
      },2000)
    }else if(sessionStorage.getItem("token")&&searchKey){
      navigate('/all-books')
    }else{
      toast.error("Something went wrong!!!")
    }
  }

  const getHomeBooks=async()=>{
    const result=await getHomeBooksAPI()
    if(result.status==200){
      setHomeBooks(result.data)
    }else{
      console.log(result);
      
    }
  }
  console.log(homeBooks);
  
  return (
    <>
    <Header/>
    <div>
      {/* section 1 */}
      <div className='min-h-75 flex flex-col bg-[url(https://images.unsplash.com/photo-1722977735215-d28f2ac6efba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]'>
      
        <h1 className='font-bold my-5 text-3xl text-center  text-white'>Explore Books</h1>
        <div className='flex gap-3 justify-center my-5'>
          <input onChange={e=>setSearchKey(e.target.value)} placeholder='search books' style={{ height:"40px"}} type="text" className='bg-white rounded-xl w-75 ' />
          <button onClick={handleSearch} style={{width:"100px", height:"40px"}} className='bg-black text-white rounded-xl '>Serach</button>
        </div>
      

      </div>
      {/* section 2 */}
      <section class="bg-gray-50 py-12 px-6">
  <h1 class="text-4xl font-bold text-center mb-10">Featured Books</h1>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

    
   {homeBooks?.length>0?homeBooks?.map(book=>(
    <div key={book?._id} class="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img src={book?.imageUrl} class="w-full h-64 object-cover hover:scale-105 transition duration-300" />
      
      <div class="p-5">
        <h2 class="text-lg font-semibold">{book?.title}</h2>
        <p class="text-sm text-gray-500 mb-2">{book?.author}</p>
        <p class="text-gray-600 text-sm">Discount Price:{book?.discountPrice}</p>
      </div>
    </div>
   )):<p className='font-bold'>Loading.....</p>}

 
    

    
    

    
   

  </div>
</section>
{/* footer */}
<footer class="bg-black text-gray-300 py-10 px-6">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    
    <div>
      <h2 class="text-2xl font-bold text-white mb-3">BookVerse</h2>
      <p class="text-sm">
        Discover your next favorite book. Explore a wide range of genres and authors in one place.
      </p>
    </div>

    
    <div>
      <h3 class="text-lg font-semibold text-white mb-3">Quick Links</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-white">Home</a></li>
        <li><a href="#" class="hover:text-white">Books</a></li>
        <li><a href="#" class="hover:text-white">Categories</a></li>
        <li><a href="#" class="hover:text-white">Contact</a></li>
      </ul>
    </div>

    
    <div>
      <h3 class="text-lg font-semibold text-white mb-3">Follow Us</h3>
      <div class="flex gap-4">
        <a href="#" class="hover:text-white">Facebook</a>
        <a href="#" class="hover:text-white">Twitter</a>
        <a href="#" class="hover:text-white">Instagram</a>
      </div>
    </div>

  </div>

  
  <div class="border-t border-gray-700 mt-8 pt-5 text-center text-sm">
    <p>© 2026 BookVerse. All rights reserved.</p>
  </div>
</footer>
    </div>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    
    theme="colored"
    
    />
    </>
  )
}

export default Home
