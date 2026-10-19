import React, { useContext, useEffect, useState } from "react";
import { FaHome, FaBook, FaBriefcase, FaCog, FaEye } from "react-icons/fa";
import { getAllBooksAPI } from "../../services/allAPI";
import { Link } from "react-router-dom";
import { searchContext } from "../../ContextAPI/ShareContext";
import { FaBarsProgress } from "react-icons/fa6";
import Header from "../components/Header";

function AllBook() {
  const { searchKey, setSearchKey } = useContext(searchContext);

  const [token, setToken] = useState("");
  const [allbooks, setAllBooks] = useState([]);
  const[categories,setCategories]=useState([])
  const[tempBooks,setTempBooks]=useState([])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem("token");
      setToken(userToken);
      getallBooks(userToken);
    }
  }, [searchKey]);

  const getallBooks = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getAllBooksAPI(reqHeader,searchKey);
    if (result.status == 200) {
      setAllBooks(result.data);
      setTempBooks(result.data)
      //add categories
      const tempCategory=result.data.map(item=>item.category)
      setCategories([...new Set(tempCategory)]);
      
      
    } else {
      console.log(result);
    }
  };
// console.log(allbooks);
// console.log(categories);

  const  filterBook=(category)=>{
    if(category!="no filter"){
      setAllBooks(tempBooks.filter(item=>item.category==category))
    }else{
      setAllBooks(tempBooks)
    }
  }

  return (
    <>
      {token ? (
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="col-span-1">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold">Filter</h1>
                <button  className="text-2xl md:hidden"><FaBarsProgress/></button>
              </div>
              <div className='md:block hidden'>        
                      {categories?.map((item,index)=>(<div key={index}  className="mt-3">
                        <input name="filter" type="radio" id={item} />
                        <label className="ms-3" htmlFor={item} onClick={()=>filterBook(item)} >
                          {item}
                        </label>
                      </div>  ))   }         
                <div className="mt-3">
                  <input type="radio" id="noFilter" name="filter" onClick={()=>filterBook("no filter")} />
                  <label className="ms-3">
                    No-Filter
                  </label>
                </div>
              </div>
            </div>

          {/* Main Section */}
          <div className="flex-1">
            {/* Top Navbar */}
           <Header/>

            {/* Welcome Bar */}
            <div className="bg-[#0f172a] text-white px-6 py-2 text-right">
              Welcome, Admin!
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-center text-xl mb-4">All Books</h2>

              {/* Tabs */}
              <div className="flex justify-center gap-4 mb-6">
                <button className="border px-4 py-1 rounded bg-white">
                  Book List
                </button>
              </div>

              {/* 🔍 Search Bar */}
              <div className="flex justify-center gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="border px-4 py-2 rounded w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                 
                  className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
                >
                  Search
                </button>
              </div>

              {/* 📚 Book Grid */}
              <div className="grid grid-cols-4 gap-6">
                {allbooks.length > 0 ? (
                  allbooks.map((book) => (
                    <div
                      key={book?._id}
                      className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl group" hidden={book.status=='sold'||book.status=='pending'}
                    >
                      {/* Image */}
                      <div className="relative h-60 overflow-hidden">
                        <img
                          src={book?.imageUrl}
                          alt="book"
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                        />

                        {/* Hover Icon */}
                        <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition">
                          <FaEye className="text-gray-600 cursor-pointer" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-blue-600 text-xs font-semibold uppercase tracking-wide">
                          {book?.author}
                        </h3>

                        <p className="text-sm font-medium text-gray-800 mt-1 line-clamp-2">
                          {book?.title}
                        </p>

                        {/* Button */}
                        <Link
                          to={`/view/${book?._id}`}
                          className="mt-3 inline-block w-full text-center bg-blue-700 text-white py-1.5 rounded-lg hover:bg-blue-900 transition"
                        >
                          View Book
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center col-span-4 text-gray-500">
                    No books found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </>
  );
}

export default AllBook;