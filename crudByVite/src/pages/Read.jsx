import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Read = () => {
  const [singleData, setSingleData] = useState({});
  const { id } = useParams();

  const fetchSingleData = async () => {
    try {
      const response = await axios.get(`${API_URL}/getsinglesuperheroe/${id}`);
      setSingleData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSingleData();
  }, [id]);
  console.log(singleData);

  return (
    <div className=" bg-[#1A4314] h-screen flex justify-center">
      <div className=" bg-white p-8 rounded shadow-md w-[600px] h-[340px] mt-[100px]">
        <h2 className="text-[30px] font-bold mb-6 text-center">
          Read a Super Hero
        </h2>
        <div className="mb-6 border-b-2">
          <div className=" flex justify-between ">
            <label
              className="block text-sm font-semibold mb-2 text-[35px]"
              htmlFor="name"
            >
              Name:
            </label>
            <label
              className="block text-sm font-semibold mb-2 text-[35px]"
              htmlFor="name"
            >
              {singleData.name}
            </label>
          </div>
        </div>
        <div className="mb-6 border-b-2">
          <div className=" flex justify-between">
            <label
              className="block text-sm font-semibold mb-2 text-[35px]"
              htmlFor="email"
            >
              Email:
            </label>
            <label
              className="block text-sm font-semibold mb-2 text-[35px]"
              htmlFor="email"
            >
              {singleData.email}
            </label>
          </div>
        </div>
        <div className="mb-6 border-b-2">
          <div className=" flex justify-between">
            <label
              className="block text-sm font-semibold mb-2 text-[35px]"
              htmlFor="contact"
            >
              Contact
            </label>
            <label
              className="block text-sm font-semibold mb-2 text-[35px]"
              htmlFor="contact"
            >
              {singleData.contact}
            </label>
          </div>
        </div>

        <div className="flex justify-between">
          <Link to={"/"}>
            <button
              type="button"
              // onClick={handleGoBack}
              className="bg-gray-500 text-white px-4 py-2 text-[19px] rounded hover:bg-gray-700"
            >
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Read;
