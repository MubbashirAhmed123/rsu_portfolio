import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGrant } from "../../store/grantSlice";
import { toast } from "react-toastify";

const companies = [
  { name: "Apple", symbol: "APPLE" },
  { name: "Google", symbol: "GOOGLE" },
  { name: "Amazon", symbol: "AMAZON" },
  { name: "Meta", symbol: "META" },
  { name: "Microsoft", symbol: "MSFT" },
  { name: "Tesla", symbol: "TESLA" },
  { name: "NVIDIA", symbol: "NVIDIA" },
];

export default function AddGrantForm() {
  const dispatch = useDispatch();
  const mode = useSelector((state: any) => state.grants.mode); 

  const [form, setForm] = useState({
    company: companies[0].name,
    symbol: companies[0].symbol,
    grantDate: "",
    shares: 0,
    grantPrice: 0,
    vestingSchedule: "25% annually for 4 years",
    vestedShares: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { grantDate, shares } = form;
    if (!grantDate || shares === 0) {
      toast.info("All fields are required.");
      return;
    }

    dispatch(
      addGrant({
        ...form,
        shares: Number(form.shares),
        grantPrice: Number(form.grantPrice),
        vestedShares: Number(form.vestedShares),
      })
    );

    setForm({
      company: companies[0].name,
      symbol: companies[0].symbol,
      grantDate: "",
      shares: 0,
      grantPrice: 0,
      vestingSchedule: "25% annually for 4 years",
      vestedShares: 0,
    });
    toast.success("Grant added successfully!");
  };

  const bgClass = mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";
  const labelClass = mode === "dark" ? "text-gray-300" : "text-gray-700";
  const inputClass =
    mode === "dark"
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-gray-50 border-gray-300 text-gray-900";

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl shadow-xl p-6 space-y-6 border ${bgClass}`}
      >
        <h2
          className={`text-2xl font-extrabold text-center mb-6 ${
            mode === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Add New Stock Grant
        </h2>

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelClass}`} htmlFor="company">
            Company
          </label>
          <select
            name="company"
            id="company"
            value={form.company}
            onChange={(e) => {
              const selected = companies.find((c) => c.name === e.target.value)!;
              setForm((prev) => ({
                ...prev,
                company: selected.name,
                symbol: selected.symbol,
              }));
            }}
            className={`w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ${inputClass}`}
          >
            {companies.map((c) => (
              <option key={c.symbol} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelClass}`} htmlFor="grantDate">
            Grant Date
          </label>
          <input
            type="date"
            name="grantDate"
            id="grantDate"
            value={form.grantDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ${inputClass}`}
          />
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelClass}`} htmlFor="shares">
            Shares
          </label>
          <input
            type="number"
            name="shares"
            id="shares"
            value={form.shares}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ${inputClass}`}
          />
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelClass}`} htmlFor="grantPrice">
            Grant Price ($)
          </label>
          <input
            type="number"
            name="grantPrice"
            id="grantPrice"
            value={form.grantPrice}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ${inputClass}`}
          />
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelClass}`} htmlFor="vestedShares">
            Vested Shares
          </label>
          <input
            type="number"
            name="vestedShares"
            id="vestedShares"
            value={form.vestedShares}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ${inputClass}`}
          />
        </div>

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelClass}`} htmlFor="vestingSchedule">
            Vesting Schedule
          </label>
          <input
            type="text"
            name="vestingSchedule"
            id="vestingSchedule"
            value={form.vestingSchedule}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 ${inputClass}`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
        >
          Add Grant
        </button>
      </form>
    </div>
  );
}
