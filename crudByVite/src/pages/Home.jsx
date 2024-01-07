import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://wash-crud-api.vercel.app/getallsuperheroes"
      );
      setData(response.data.data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteSuperHero = (id) => {
    if (confirm("Are you Sure to delete ?")) {
      axios.delete(`https://wash-crud-api.vercel.app/deletesuperheroe/${id}`);
      setTimeout(() => {
        fetchData();
      }, 100);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <div className=" bg-[#603F8B] h-screen flex flex-col items-center">
      <div className=" font-bold text-[35px] text-white mt-20">
        List of Super Heroes
      </div>
      <div className=" flex mt-10">
        <div className="">
          <table className="w-[1000px] bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all ease-in-out">
            <thead>
              <tr className=" border-b-2 border-[#ACAFAC]">
                <th className="py-2 px-4 text-left text-[20px]">Sr. no</th>
                <th className="py-2 px-4 text-left text-[20px]">Name</th>
                <th className="py-2 px-4 text-left text-[20px]">Email</th>
                <th className="py-2 px-4 text-left text-[20px]">Contact</th>
                <th className="py-2 px-4 text-left text-[20px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((superHero, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-[20px]">{index + 1}</td>
                  <td className="py-2 px-4 text-[20px]">{superHero.name}</td>
                  <td className="py-2 px-4 text-[20px]">{superHero.email}</td>
                  <td className="py-2 px-4 text-[20px]">{superHero.contact}</td>
                  <td className="py-2 px-4 text-[20px] flex justify-between">
                    <Link to={`/read/${superHero._id}`}>
                      <button className="bg-[#1A4314] text-white px-2 py-0 rounded-md text-[20px]">
                        R
                      </button>
                    </Link>
                    <Link to={`/update/${superHero._id}`}>
                      <button className="bg-[#2F2440] text-white px-2 py-0 rounded-md text-[20px]">
                        U
                      </button>
                    </Link>
                    <button
                      className="bg-[#FF2511] text-white px-2 py-0 rounded-md text-[20px]"
                      onClick={() => deleteSuperHero(superHero._id)}
                    >
                      D
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <Link to={"/create"}>
            <button className="bg-[#FD49A0] text-white px-4 py-2 mx-8 rounded-xl hover:bg-[#AB0552] col-span-2">
              Create
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
