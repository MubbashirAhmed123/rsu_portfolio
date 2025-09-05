import { useSelector } from "react-redux";
import { generateVestingEvents } from "../../utils/vested";
import type { RootState } from "../../store/store";
import { Calendar } from "lucide-react";

export default function VestingCalendar() {
  const grants = useSelector((state: RootState) => state.grants.grants);
  const mode = useSelector((state: RootState) => state.grants.mode); // light | dark

  let allEvents: { company: string; date: string; shares: number; value: number }[] = [];

  grants.forEach((g) => {
    const events = generateVestingEvents(g).map((e) => ({
      company: g.company,
      ...e,
    }));
    allEvents = [...allEvents, ...events];
  });

  const sorted = allEvents.sort((a, b) =>
    new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1
  );

  if (sorted.length === 0) {
    return (
      <div
        className={`p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
          mode === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <p
          className={`text-center text-lg font-medium ${
            mode === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <Calendar className="inline-block mr-2" />
          No vesting events available. Add a grant to see your calendar.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`p-6 sm:p-8 rounded-2xl shadow-xl transition-colors duration-300 ${
        mode === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-extrabold mb-5 pb-3 border-b ${
          mode === "dark"
            ? "text-white border-gray-700"
            : "text-gray-900 border-gray-200"
        }`}
      >
        Vesting Calendar
      </h2>

      <div className="space-y-4 md:hidden">
        {sorted.map((e, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl shadow-sm transition-transform duration-300 hover:scale-[1.01] hover:shadow-md ${
              mode === "dark" ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`font-semibold text-lg ${
                  mode === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {e.company}
              </span>
              <span
                className={`text-sm font-medium ${
                  mode === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {e.date}
              </span>
            </div>
            <div
              className={`flex justify-between items-center text-sm ${
                mode === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span className="flex items-center">
                Shares:
                <span
                  className={`font-bold text-lg ml-1 ${
                    mode === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {e.shares}
                </span>
              </span>
              <span className="flex items-center">
                Value:
                <span
                  className={`font-bold text-lg ml-1 ${
                    mode === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                >
                  ${e.value.toFixed(2)}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table
          className={`min-w-full rounded-xl overflow-hidden ${
            mode === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <thead className={mode === "dark" ? "bg-gray-700" : "bg-gray-100"}>
            <tr
              className={`uppercase text-sm leading-normal ${
                mode === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Company</th>
              <th className="py-3 px-6 text-right">Shares</th>
              <th className="py-3 px-6 text-right">Value ($)</th>
            </tr>
          </thead>
          <tbody
            className={`text-sm font-light ${
              mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {sorted.map((e, i) => (
              <tr
                key={i}
                className={`border-b transition-colors duration-200 ${
                  mode === "dark"
                    ? "border-gray-700 hover:bg-gray-900"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <td className="py-3 px-6 text-left">{e.date}</td>
                <td className="py-3 px-6 text-left">{e.company}</td>
                <td
                  className={`py-3 px-6 text-right font-medium ${
                    mode === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {e.shares}
                </td>
                <td
                  className={`py-3 px-6 text-right font-medium ${
                    mode === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                >
                  ${e.value.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
