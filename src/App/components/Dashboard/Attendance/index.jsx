import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { supabase } from "../../../../supabaseClient";
function Attendance() {
  const [attend, setAttend] = useState([]);
  const [dates, setDates] = useState(null);
  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [data, setData] = useState([]);
  const [modal2, setModal2] = useState(null);
  const [classroom, setClassroom] = useState({});
  const [kid, setKid] = useState([]);
  const token = localStorage.getItem("teacherToken");
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const teacher_id = localStorage.getItem("teacher");
  useEffect(() => {
    // MOCK DATA for demo/testing
    setClassroom({ id: 1, name: 'Class A' });
    setKid([
      { id: 1, first_name: 'Alice', last_name: 'Smith' },
      { id: 2, first_name: 'Bob', last_name: 'Doe' },
      { id: 3, first_name: 'Charlie', last_name: 'Brown' },
    ]);
  }, []);

  useEffect(() => {
    // MOCK DATA for demo/testing
    setAttend([
      { id: 1, classroom_id: 1, student_id: 1, student_name: 'Alice', status: 'Present', date: '2025-09-13' },
      { id: 2, classroom_id: 1, student_id: 2, student_name: 'Bob', status: 'Absent', date: '2025-09-13' },
    ]);
  }, []);

  function takeAttendance(p) {
    setModal2(false);
    // MOCK: always allow taking attendance
    let register = kid.map((k, i) => {
      return (
        <li key={i} className="border m-2 grid grid-cols-3 rounded-md p-5">
          <span>{`${k.first_name} ${k.last_name || k.second_name || ''}`}</span>
          <button
            onClick={(e) => handlePresent(e, k)}
            className="outline outline-1 text-sky-600 hover:text-white hover:bg-sky-600 px-1 h-10 m-2 rounded-md">
            Present
          </button>
          <button
            onClick={(e) => handleAbsent(e, k)}
            className="outline outline-1 text-red-500 hover:text-white hover:bg-red-600 px-1 h-10 m-2 rounded-md">
            Absent
          </button>
        </li>
      );
    });
    setData(register);
  }

  function handlePresent(e, k) {
    e.target.parentElement.style.display = "none";
    // MOCK: no-op
  }
  function handleAbsent(e, k) {
    e.target.parentElement.style.display = "none";
    // MOCK: no-op
  }

  return (
    <div className="w-4/5 flex items-center flex-col m-auto">
      <button
        onClick={() => {
          setModal2(true);
          setModal3(false);
        }}
        className="rounded-md shadow-md h-10 outline outline-1 text-pink-500 mt-4 mr-4 px-2 sm:float-right hover:text-white hover:bg-pink-500">
        Take Attendance
      </button>
      <button
        onClick={() => {
          setModal3(true);
          setModal2(false);
        }}
        className="rounded-md shadow-md h-10 outline outline-1 text-pink-500 mt-4 mr-4 px-2 sm:float-right hover:text-white hover:bg-pink-500">
        View Attendance
      </button>
      {modal3 ? (
        <div className="flex flex-col p-8">
          <p className="text-2xl font-serif m-2 text-center">
            Select a day to view its attendance
          </p>
          <input
            className="border rounded-md h-10 m-2"
            type="date"
            onChange={(e) => setDates(e.target.value)}
          />
          <button
            onClick={() => setModal(true)}
            className="text-pink-500 outline outline-1 hover:text-white hover:bg-pink-500 px-6 ml-2 m-2 rounded-md">
            submit
          </button>
        </div>
      ) : null}
      {modal2 ? (
        <div className="flex  flex-col p-5 mt-7">
          <p>enter the day you want to fill attendance</p>
          <input
            className="border rounded-md h-10 m-2"
            type="date"
            onChange={(e) => setDates(e.target.value)}
          />
          <button
            onClick={() => takeAttendance(dates)}
            className="text-pink-500 outline outline-1 m-2 hover:text-white hover:bg-pink-500 px-6 ml-2 rounded-md">
            submit
          </button>
        </div>
      ) : null}
      {true ? <ul className="sm:mt-8 p-4">{data}</ul> : null}

      {modal ? (
        <li className="border m-2 rounded-md p-5">
          This is attendance for date {dates} --click view for more details
          <Link
            to={`${dates}`}
            className="rounded-md  float-right border outline outline-1 px-6 hover:text-white hover:bg-pink-500 text-pink-500 p-1">
            view
          </Link>
        </li>
      ) : null}
    </div>
  );
}

export default Attendance;
