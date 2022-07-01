import "./styles.css";
import { Card } from "../../components/Card";
import React, { useState, useEffect } from "react";
export function Index() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [data, setData] = useState({ name: "", avatar: "" });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
    console.log(students);
  }

  const url = "https://api.github.com/users/AllisonPedro";

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        setData({
          name: data.name,
          avatar: data.avatar_url,
        });
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{data.name}</strong>
          <img src={data.avatar} alt="" />
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}