import { useSelector } from "react-redux";
import { getUpcomingVests } from "../../utils/vested";
import type { RootState } from "../../store/store";

export default function UpcomingVests() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const mode = useSelector((state: RootState) => state.grants.mode);
  const events = getUpcomingVests(grants, 4);

  if (events.length === 0) {
    return (
      <div
        className={`p-8 ${
          mode === "dark" ? "bg-gray-800" : "bg-white"
        } rounded-2xl shadow-lg transition-colors duration-300`}
      >
        <p
          className={`${
            mode === "dark" ? "text-gray-400" : "text-gray-500"
          } text-center text-lg`}
        >
           No upcoming vests to display. You're all caught up!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 sm:p-8 ${
        mode === "dark" ? "bg-gray-800" : "bg-white"
      } rounded-2xl shadow-xl transition-colors duration-300`}
    >
      <h2
        className={`text-2xl font-extrabold ${
          mode === "dark" ? "text-white border-gray-700" : "text-gray-900 border-gray-200"
        } mb-5 border-b pb-3`}
      >
        Upcoming Vests
      </h2>
      <ul className="space-y-4">
        {events.map((e, idx) => (
          <li
            key={idx}
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 ${
              mode === "dark" ? "bg-gray-700" : "bg-gray-50"
            } rounded-xl transition-transform duration-300 hover:scale-[1.01] hover:shadow-md`}
          >
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <span
                className={`text-xl ${
                  mode === "dark" ? "text-blue-400" : "text-blue-500"
                }`}
              >
                📅
              </span>
              <div>
                <span
                  className={`font-semibold ${
                    mode === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {e.company}
                </span>
                <p
                  className={`text-sm ${
                    mode === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {e.date}
                </p>
              </div>
            </div>

            <div className="flex-shrink-0 text-right">
              <span
                className={`font-bold text-lg ${
                  mode === "dark" ? "text-green-400" : "text-green-600"
                }`}
              >
                {e.shares} shares
              </span>
              <p
                className={`text-sm ${
                  mode === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                ~${e.value.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
