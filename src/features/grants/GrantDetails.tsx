import { useSelector } from "react-redux";
import AddGrantForm from "./AddGrantForm";
import GrantList from "./GrantList";

export default function AddGrantPage() {
  const mode = useSelector((state: any) => state.grants.mode);

  const bgClass = mode === "dark" ? "bg-gray-900" : "bg-gray-100";
  const headingClass = mode === "dark" ? "text-white" : "text-gray-900";
  const subTextClass = mode === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`min-h-screen ${bgClass} transition-colors duration-300 py-10 px-4 sm:px-6 lg:px-8`}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center">
          <h1
            className={`text-4xl sm:text-5xl font-extrabold leading-tight ${headingClass}`}
          >
            RSU Grant Management 📈
          </h1>
          <p className={`mt-2 text-lg ${subTextClass}`}>
            Track and manage your restricted stock units.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <AddGrantForm />
          <GrantList />
        </div>
      </div>
    </div>
  );
}
