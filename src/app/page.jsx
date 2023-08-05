import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Task";
import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

export default async function HomePage() {
  const tasks = await loadTasks();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-8 lg:my-12 mx-4">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}
