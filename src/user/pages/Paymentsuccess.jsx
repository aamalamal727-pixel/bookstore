import React from 'react'
import Header from '../components/Header'
import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Paymentsuccess() {
  return (
    <div>
        <Header/>
        <div className='container min-h-screen flex justify-center items-center'>
            <div className='md:grid grid-cols-2 px-20 justify-center items-center my-10 '>
                <div>
                    <h1 className='text-blue-500 md:text-4xl'>Congratulation!!!</h1>
                    <p className='text-2xl my-10'>Thankyou for purchasing with the bookstore.hope you have a good time with us....</p>
                    <Link to={'/all-books'} className='flex items-center bg-blue-600 w-60 p-2 text-white font-bold'>
                    <FaBackward className='me-2'/>Explore More Books!!!
                    </Link>
                </div>
                <div className='flex justify-center items-center'>
                  <img src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="payment success" />
                </div>
            </div>

        </div>
      
    </div>
  )
}

export default Paymentsuccess
