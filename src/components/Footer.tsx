import { useSelector } from 'react-redux';

function Footer() {
      const mode = useSelector((state: any) => state.grants.mode);

  return (
<footer
                className={`mt-8 sm:mt-12 text-center text-xs sm:text-sm border-t pt-6 transition-colors duration-300 ${
                  mode === "dark"
                    ? "text-gray-400 border-gray-700"
                    : "text-gray-400 border-gray-200"
                }`}
              >
                <div className="max-w-7xl mx-auto">
                  © {new Date().getFullYear()} RSU Tracker. All rights reserved.
                </div>
              </footer>  )
}

export default Footer