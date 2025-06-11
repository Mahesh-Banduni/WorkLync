import { MailPlus, Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="w-full md:ml-64 h-16 flex items-center justify-end px-6 border-b sticky top-0 bg-white z-30">
      <div className="flex items-center justify-items-between gap-4">
      <p>Employees</p>
      <div className="inline-flex">
        <MailPlus className="w-5 h-5 text-purple-800" />
        <Bell className="w-5 h-5 text-purple-800" />
        </div>
      </div>
    </div>
  );
}
