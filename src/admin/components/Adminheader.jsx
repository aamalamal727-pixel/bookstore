import React from 'react'

function Adminheader() {
  return (
    <>
    <div className='flex justify-between items-center p-3 md:px-20'>
      {/* logo */}
      <div className='flex items-center'>
        <img width={'50px'}  height={'50px'} src="https://i.pinimg.com/originals/2a/64/a0/2a64a0ebe6cf1ee2ac27878f920e46b2.gif" alt="logo" />
        <h1 className='text-2xl font-bold ms-2'>BOOKSTORE</h1>

      </div>
      {/* logout block */}
      <button className='border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white'>{" "}Logout{" "}</button>

    </div>
    <div className='w-full p-3 bg-black text-white'>
      <p>welcome, admin! you 're all set to manage and monitor the system. Let's get to work!</p>
    </div>
      
    </>
  )
}

export default Adminheader
