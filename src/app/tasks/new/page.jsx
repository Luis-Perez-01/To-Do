"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();
  const params = useParams();

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({
      title: data.title,
      description: data.description,
    });
  };

  const createTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this task?")) {
        fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      await createTask();
    } else {
      updateTask();
    }
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold my-2">
            {!params.id ? "Create Task" : "Update Task"}
          </h1>
          <button
            onClick={handleDelete}
            type="button"
            className="btn-small text-xl font-bold h-8"
          >
            ×
          </button>
        </header>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control my-2"
          onChange={handleChange}
          value={newTask.title}
        />
        <textarea
          name="description"
          id=""
          rows="5"
          placeholder="Description"
          className="form-control my-2"
          onChange={handleChange}
          value={newTask.description}
        ></textarea>
        <button
          type="submit"
          className="btn-mid text-sm font-semibold w-20 my-1"
        >
          {!params.id ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
}
