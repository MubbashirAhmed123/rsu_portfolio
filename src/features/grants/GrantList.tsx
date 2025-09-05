import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  type Grant,
  updateGrant,
  deleteGrant,
} from "../../store/grantSlice";
import type { RootState } from "../../store/store";
import { toast } from "react-toastify";

export default function GrantList() {
  const dispatch = useDispatch();
  const grants = useSelector((state: RootState) => state.grants.grants);
  const mode = useSelector((state: RootState) => state.grants.mode);
  const [editingGrant, setEditingGrant] = useState<Grant | null>(null);

  const cardBg = mode === "dark" ? "bg-gray-800" : "bg-white";
  const headingText = mode === "dark" ? "text-white" : "text-gray-900";
  const subText = mode === "dark" ? "text-gray-400" : "text-gray-500";
  const border = mode === "dark" ? "border-gray-600" : "border-gray-300";
  const inputBg = mode === "dark" ? "bg-gray-700 text-white" : "bg-gray-50 text-gray-900";

  if (grants.length === 0) {
    return (
      <div className={`flex items-center justify-center p-8 ${cardBg} rounded-2xl shadow-lg`}>
        <p className={`${subText} text-lg`}>
          No grants added yet. Start by adding one!
        </p>
      </div>
    );
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGrant) {
      dispatch(updateGrant({ id: editingGrant.id, updated: editingGrant }));
      setEditingGrant(null);
      toast.success("Grant updated successfully!");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold ${headingText}`}>Your Grants</h2>
      {grants.map((g) => (
        <div
          key={g.id}
          className={`p-5 ${cardBg} rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0`}
        >
          <div className="flex-1 min-w-0">
            <h3 className={`font-extrabold text-lg truncate ${headingText}`}>
              {g.company} ({g.symbol})
            </h3>
            <div className={`text-sm ${subText} mt-1 space-y-1`}>
              <p>
                <span className="font-medium">Shares:</span> {g.shares}
              </p>
              <p>
                <span className="font-medium">Grant Price:</span> ${g.grantPrice}
              </p>
              <p>
                <span className="font-medium">Date:</span> {g.grantDate}
              </p>
              <p>
                <span className="font-medium">Vested:</span> {g.vestedShares}
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center space-x-3 mt-3 sm:mt-0">
            <button
              onClick={() => setEditingGrant(g)}
              className={`px-4 py-2 text-sm font-semibold rounded-full 
                ${mode === "dark"
                  ? "bg-blue-900 text-blue-300 hover:bg-blue-800"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"} 
                transition-colors duration-200`}
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteGrant(g.id))}
              className={`px-4 py-2 text-sm font-semibold rounded-full 
                ${mode === "dark"
                  ? "bg-red-900 text-red-300 hover:bg-red-800"
                  : "bg-red-50 text-red-600 hover:bg-red-100"} 
                transition-colors duration-200`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editingGrant && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <form
            onSubmit={handleUpdate}
            className={`relative ${cardBg} p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6 transform scale-95 animate-scale-up`}
          >
            <h2 className={`text-2xl font-bold ${headingText} text-center`}>
              Edit Grant
            </h2>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${subText}`}>Shares</label>
                <input
                  type="number"
                  value={editingGrant.shares}
                  onChange={(e) =>
                    setEditingGrant({ ...editingGrant, shares: +e.target.value })
                  }
                  className={`w-full px-4 py-2 mt-1 border ${border} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${subText}`}>Grant Price ($)</label>
                <input
                  type="number"
                  value={editingGrant.grantPrice}
                  onChange={(e) =>
                    setEditingGrant({ ...editingGrant, grantPrice: +e.target.value })
                  }
                  className={`w-full px-4 py-2 mt-1 border ${border} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${subText}`}>Vested Shares</label>
                <input
                  type="number"
                  value={editingGrant.vestedShares}
                  onChange={(e) =>
                    setEditingGrant({ ...editingGrant, vestedShares: +e.target.value })
                  }
                  className={`w-full px-4 py-2 mt-1 border ${border} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${subText}`}>Vesting Schedule</label>
                <input
                  type="text"
                  value={editingGrant.vestingSchedule}
                  onChange={(e) =>
                    setEditingGrant({ ...editingGrant, vestingSchedule: e.target.value })
                  }
                  className={`w-full px-4 py-2 mt-1 border ${border} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${inputBg}`}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setEditingGrant(null)}
                className={`px-6 py-2 rounded-full font-semibold border ${border} ${subText} ${inputBg} hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
