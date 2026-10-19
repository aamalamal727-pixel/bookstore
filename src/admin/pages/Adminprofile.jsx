import React from "react";
import Adminheader from "../components/Adminheader";
import Adminsidebar from "../components/Adminsidebar";

function Adminprofile() {
  return (
    <>
      <Adminheader />
      <div className="md:grid grid-cols-5 gap-2">
        <div className="col-span-1">
          <Adminsidebar />
        </div>
        <div className="col-span-4">
          <h1 className="text-3xl font-bold text-center my-5">Settings</h1>
          <div className="md:grid grid-cols-2 gap-5 mx-5 items-center">
            <div>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis iste cum corporis numquam blanditiis, doloribus,
                obcaecati minima cupiditate sint a fugiat impedit, laboriosam
                praesentium nulla omnis tempore inventore commodi et?
              </p>
              <p className="text-justify mt-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
                unde saepe molestias officiis sed ipsa nostrum quas nesciunt
                quae alias, tenetur inventore, magni dignissimos error illo!
                Atque amet architecto maxime.
              </p>
            </div>

            <div className="rounded bg-blue-100 p-10 flex justify-center items-center flex-col mt-10 md:mt-0">
              <label htmlFor="bookImage">
                <input type="file" name="" id="bookImage" className="hidden" />
                <img
                  src="https://img.freepik.com/premium-vector/man-character_665280-46970.jpg"
                  alt="book"
                  width={"200px"}
                  height={"200px"}
                />
              </label>
              <div className="mb-3 w-full mt-20">
                <input
                  type="text"
                  className="p-2 bg-white border border-gray-200 text-black w-full rounded placeholder-gray-600"
                  placeholder="Username"
                />
              </div>
              <div className="mb-3 w-full">
                <input
                  type="text"
                  className="p-2 bg-white border border-gray-200 text-black w-full rounded placeholder-gray-600"
                  placeholder="Password"
                />
              </div>
              <div className="mb-3 w-full">
                <input
                  type="text"
                  className="p-2 bg-white border border-gray-200 text-black w-full rounded placeholder-gray-600"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="my-3 w-full flex justify-evenly">
                <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-400">
                  RESET
                </button>
                <button className="bg-green-900 text-white px-3 py-2 rounded hover:bg-green-500">
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminprofile;
