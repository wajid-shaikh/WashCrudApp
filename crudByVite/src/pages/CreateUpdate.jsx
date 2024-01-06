import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CreateUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
  });

  const { id } = useParams();

  const history = useNavigate();

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    // Implement your logic for handling the 'Add' or 'Update' button click here
    if (!id) {
      const response = await axios.post(
        "http://localhost:3000/createsuperheroes",
        formData
      );
      console.log("Data posted successfully:", response.data);
      // Reset the form fields
      setFormData({
        name: "",
        email: "",
        contact: "",
      });
    } else {
      const response = await axios.put(
        `http://localhost:3000/updatesuperheroe/${id}`,
        formData
      );
      console.log("Data Updated successfully:", response.data);
      // Reset the form fields
      setTimeout(() => {
        history("/");
      }, 100);
    }
  };

  if (id) {
    const fetchSingleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getsinglesuperheroe/${id}`
        );
        setFormData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      fetchSingleData();
    }, [id]);
    console.log(formData);
  }

  const handleGoBack = () => {
    // Implement your logic for handling the 'Go Back' button click here
    console.log("Go Back");
  };
  return (
    <div
      className={`${
        id ? "bg-[#2F2440]" : "bg-[#AB0552]"
      } h-screen flex justify-center`}
    >
      <div className=" bg-white p-8 rounded shadow-md w-[600px] h-[450px] mt-[100px]">
        <h2 className="text-[25px] font-bold mb-6 text-center">
          {id ? "Update" : "Create"} a Super Hero
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2 text-[19px]"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-[19px]"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-2 text-[19px]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-[19px]"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-semibold mb-2 text-[19px]"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-[19px]"
              placeholder="Enter your contact number"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAdd}
              className={`${
                id
                  ? "bg-[#2F2440] hover:bg-[#613659]"
                  : "bg-[#FD49A0] hover:bg-[#BA0F30]"
              } text-white px-4 py-2 rounded  text-[19px]`}
            >
              {id ? "Update" : "Add"}
            </button>
            <Link to={"/"}>
              <button
                type="button"
                onClick={handleGoBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 text-[19px]"
              >
                Go Back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUpdate;
