import React, { Component, createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../Signup";
import { supabase } from "../../../supabaseClient";
export const TeacherContext = createContext();
export const TeacherContextProvider = (props) => {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [onLogin, setLogin] = useState({});
  const [teacher, setTeacher] = useState({});
  const [modal, setModal] = useState(false);
  function handleNotification() {
    setModal(true);
    handleClose();
  }

  function handleClose() {
    setTimeout(() => {
      setModal(false);
      navigate("/dashboard");
    }, 3000);
  }

  async function onSubmit(data) {
    // Supabase sign in with email and password
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (signInError) {
      alert(signInError.message);
      return;
    }
    // Fetch teacher profile from teachers table
    const { data: teacherData, error: teacherError } = await supabase
      .from('teachers')
      .select('*')
      .eq('email', data.email)
      .single();
    if (teacherError) {
      alert(teacherError.message);
      return;
    }
    localStorage.clear();
    localStorage.setItem("teacherToken", signInData.session.access_token);
    localStorage.setItem("teacher", `${teacherData.id}`);
    localStorage.setItem("teacher_data", JSON.stringify(teacherData));
    setLogin((onLogin) => teacherData);
    handleNotification();
  }
  //  This function is called in the Signup Component
  async function onSubmition(data) {
    // MOCK SIGNUP for demo/testing
    const teacherData = {
      id: 1,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      career_name: data.career_name,
    };
    setTeacher(teacherData);
    localStorage.clear();
    localStorage.setItem("teacher", teacherData.id);
    localStorage.setItem("teacher_data", JSON.stringify(teacherData));
    handleNotification();
  }
  const token = localStorage.getItem("teacherToken");
  const teacher_id = localStorage.getItem("teacher");
  const contextValue = { onSubmit, onSubmition, teacher_id, modal, token,done,setDone };
  return (
    <TeacherContext.Provider value={contextValue}>
      {props.children}
    </TeacherContext.Provider>
  );
};
