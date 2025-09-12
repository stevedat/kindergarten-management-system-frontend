import { supabase } from "../../../../supabaseClient";
import React, { useContext, useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import "./Classes.css";

function Classes() {
  const [classroom, setClassroom] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [update, setUpdate] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);
  const token = localStorage.getItem("teacherToken");
  const teacher_id = localStorage.getItem("teacher");
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    async function fetchClassroom() {
      const { data: classroomData, error } = await supabase
        .from('classrooms')
        .select('*')
        .eq('teacher_id', teacher_id)
        .single();
      if (!error) setClassroom(classroomData);
      else setClassroom(null);
    }
    fetchClassroom();
  }, [update, teacher_id]);
  async function asignClass(id) {
    await supabase
      .from('classrooms')
      .update({ teacher_id: parseInt(teacher_id) })
      .eq('id', id);
    setUpdate((update) => !update);
  }

  useEffect(() => {
    async function fetchAvailableClasses() {
      const { data: classesData, error } = await supabase
        .from('classrooms')
        .select('*, teacher:teachers(*)');
      if (!error) setAvailableClasses(classesData);
    }
    fetchAvailableClasses();
  }, []);
  console.log(availableClasses);

  const list = availableClasses.map((c) => {
    return (
      <div className="flex flex-col rounded-md h-28 shadow-lg text-center">
        <span>{c.name}</span>
        <span>current teacher:{c.teacher.career_name}</span>
        <button
          onClick={() => asignClass(c.id)}
          className="outline outline-1  hover:bg-[#b124A3] rounded-md hover:text-white m-3 text-[#b124A3]">
          Assign to me
        </button>
      </div>
    );
  });

  async function handleClick(id) {
    const { data: classroomData, error } = await supabase
      .from('classrooms')
      .select('students:students(*)')
      .eq('id', id)
      .single();
    if (!error) setModalData(classroomData.students);
  }

  if (classroom === null) {
    return (
      <div>
        <h1 className="text-center">Select a class you will be teaching</h1>
        <h1 className="mt-3 text-center text-2xl">Available classes</h1>
        <div className="grid sm:grid-cols-3">{list}</div>
      </div>
    );
  } else {
    return (
      <div className="classes-page">
        <h1>Classes</h1>
        <div className="sub-div">
          <div className="class-card">
            <div className="logo-div">
              <h2 className="header">KD</h2>
            </div>
            <h2 className="header-2">{classroom.name}</h2>
            <p></p>
            <button
              className="button-5"
              type="submit"
              onClick={() => {
                setModal(true);
                handleClick(classroom.id);
              }}>
              See Students
            </button>
          </div>
        </div>
        {modal && <Modal setModal={setModal} modalData={modalData} />}
      </div>
    );
  }
}

export default Classes;
