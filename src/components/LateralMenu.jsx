import Link from "next/link";

export default function LateralMenu() {
  return (
    <div className="flex-initial w-32 lg:w-80 h-screen bg-[#17191d] p-2 lg:p-6 overflow-y-auto">
      <Link href="/" class="block btn-mid text-sm my-10">
        📌 To Do App
      </Link>
      <nav class="text-sm space-y-2 my-2">
        <Link href="/tasks/new" class="block btn-mid">
          <span className="mr-1">➕</span>New Task
        </Link>
      </nav>
    </div>
  );
}
