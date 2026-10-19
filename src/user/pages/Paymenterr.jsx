import React from 'react'
import Header from '../components/Header'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Paymenterr() {
  return (
    <div>
        <Header/>
        <div className='container min-h-screen flex justify-center items-center'>
            <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10 '>
                <div>
                    <h1 className='text-red-600 md:text-4xl'>Sorry!!! Payment Unsuccessful</h1>
                    <p className='text-2xl my-10 text-red-600'>We applogize for the inconvience caused and appreciate your visit to bookstore....</p>
                    <Link to={'/all-books'} className='flex items-center bg-red-600 w-60 p-2 text-white font-bold'>
                    <FaBackward className='me-2'/>Explore More Books!!!
                    </Link>
                </div>
                <div className='flex justify-center items-center'>
                  <img src="https://assets-v2.lottiefiles.com/a/6a1f0bce-1178-11ee-a807-ebab7337127e/5rsPIZBogk.gif" alt="payment success" />
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Paymenterr
