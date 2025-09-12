
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./ParentSignup.css";
import Nav from "../Home/Nav";
import { supabase } from "../../../supabaseClient";

function ParentSignup() {
  const [parent, setParent] = useState([]);
  const [modal,setModal] = useState(false)
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleNotification() {
setModal(true);
handleClose()
  }

function handleClose(){
  setTimeout(()=>{
    setModal(false)
    navigate("/parent_dashboard")
  },3000)
}

  async function onSubmit(data) {
    setErrors([]);
    // Supabase sign up
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (signUpError) {
      alert(signUpError.message);
      return;
    }
    // Insert parent profile into parents table
    const { data: parentData, error: parentError } = await supabase
      .from('parents')
      .insert([
        {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone_number: data.phone_number,
        },
      ])
      .select()
      .single();
    if (parentError) {
      alert(parentError.message);
      return;
    }
    localStorage.setItem("parent", `${parentData.id}`);
    localStorage.setItem("parent_data", JSON.stringify(parentData));
    handleNotification();
  }
  return (

    <div className=" w-screen h-screen bg-[#B124A3]">
      <Nav />
      <hr className="border border-1"></hr>
      <div className="flex justify-center">
      <div className="main-container bg-white">
        <div className="card-one sm:block hidden">
          <div className="sub-card">
            <img
              src="https://i.ibb.co/rkY319L/Screenshot-2023-01-01-at-01-08-52.png"
              alt="image"></img>
          </div>
          <h2 className="text">Kinderjoy Parent</h2>
          <h2 className="text2">
            Already have an account?{" "}
            <Link to="/parent_login" style={{ color: "#B124A3" }}>
              Login Here
            </Link>
          </h2>
        </div>
        <div className="card-two">
         <div className="">
         <h3 className="text-center">Parent Registration</h3>
          <h1 className="text-center text-gray-400">New Parent Registration</h1>
         </div>
          <form className="grid grid-cols-1 gap-3 m-10" onSubmit={handleSubmit(onSubmit)}>
            {modal?<div className="h-10 text-pink-600 text-center bg-white rounded-md shadow-md">
              Signup Succesfull
            </div>:null}
            <label>First Name</label>
            <input
              id="first_name"
              className="border rounded-md p-3"
              type="text"
              name="first_name"
              placeholder="Enter your first name..."
              {...register("first_name")}
            />
             <label>Last Name</label>
            <input
              id="last_name"
              className="border rounded-md p-3"
              type="text"
              name="last_name"
              placeholder="Enter your last name..."
              {...register("last_name")}
            />
             <label>Phone Number</label>
            <input
              id="phone_number"
              className="border rounded-md p-3"
              type="number"
              name="phone_number"
              placeholder="Enter your phone number..."
              {...register("phone_number")}
            />
            <label>Password</label>
            <input
              id="password"
              className="border rounded-md p-3"
              type="password"
              name="password"
              placeholder="Enter your password..."
              {...register("password")}
            />
             <button
                className="px-5 p-3 bg-[#B124A3] text-white rounded-md"
                type="submit">
                Register
              </button>
          </form>

        </div>
      </div>
      </div>
    </div>
  );
}

export default ParentSignup;
