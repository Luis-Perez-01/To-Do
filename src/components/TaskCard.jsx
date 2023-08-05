import Link from "next/link";

export default function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task._id}`}>
      <div className="flex flex-col bg-[#1C1F23] rounded-md hover:bg-[#21252a] divide-y divide-[#2b2e34] border border-[#2E3137] cursor-pointer h-full w-full">
        <header className="flex-none">
          <h3 className="text-xl font-semibold p-2">{task.title}</h3>
        </header>
        <section className="grow">
          <p className="p-2 min-h-[10rem]">{task.description}</p>
        </section>
        <footer className="flex-none">
          <p className="text-xs text-[#3b4148] float-right p-2">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </footer>
      </div>
    </Link>
  );
}
