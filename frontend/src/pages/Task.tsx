/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Table, Button, Input } from "antd";
import Navbar from "../components/Navbar";
import { fetchAPI } from "../api/fetch";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const data = await fetchAPI("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    fetchTasks();
  }, []);

  const addTask = async () => {
    await fetchAPI("/tasks", {
      method: "POST",
      body: JSON.stringify({
        title,
        assignedTo: "Admin",
        deadline: new Date(),
      }),
    });

    fetchTasks();
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6">
        <Input
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3"
        />

        <Button onClick={addTask}>Add Task</Button>

        <Table
          dataSource={tasks}
          rowKey="id"
          className="mt-4"
          columns={[
            { title: "Title", dataIndex: "title" },
            { title: "Assigned", dataIndex: "assignedTo" },
            { title: "Deadline", dataIndex: "deadline" },
          ]}
        />
      </div>
    </div>
  );
}
