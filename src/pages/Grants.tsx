import { useSelector } from "react-redux";
import AddGrantForm from "../features/grants/AddGrantForm";
import GrantList from "../features/grants/GrantList";

export default function GrantsPage() {
    const mode = useSelector((state: any) => state.grants.mode);

    const headingClass = mode === "dark" ? "text-white" : "text-gray-900";

  return (
    <div className="space-y-10">
      <div className="text-center md:text-left">
        <h1 className={`text-3xl md:text-4xl font-extrabold text-gray-900 ${headingClass}`}>
          RSU Grant Management 📈
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track and manage your restricted stock units.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        <AddGrantForm />
        <GrantList />
      </div>
    </div>
  );
}