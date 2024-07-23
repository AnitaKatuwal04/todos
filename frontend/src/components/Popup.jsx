import PropTypes from "prop-types";

import { FaArrowRight } from "react-icons/fa";

const Popup = ({ title, onSubmit, formData, setFormData, onClose }) => (
  <div className="fixed inset-0 z-50">
    <div className="bg-[#00000088] w-screen h-screen flex justify-center items-center">
      <div className="bg-gray-50 px-16 py-12 rounded-[45px] flex flex-col space-y-12 justify-center items-center shadow-lg w-1/3">
        <div className="text-4xl font-semibold tracking-wide">
          <span className="text-stone-500">{title}</span>
        </div>
        <form onSubmit={onSubmit} className="w-full">
          <div className="mb-6">
            <label htmlFor="title" className="block text-xl mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter Title"
              className="w-full shadow-md bg-white p-3 rounded-2xl focus:outline-blue-400"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-xl mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Enter Description"
              className="w-full shadow-md bg-white p-3 rounded-2xl h-64 focus:outline-blue-400"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white text-xl py-3 px-6 rounded-3xl shadow-lg hover:bg-blue-600 transition duration-300 flex justify-center items-center gap-4"
            >
              {title.includes("Enter") ? "Add Task" : "Edit Task"}{" "}
              <FaArrowRight />
            </button>
            <button
              type="button"
              className="ml-4 bg-gray-400 text-white text-xl py-3 px-6 rounded-3xl shadow-lg hover:bg-gray-500 transition duration-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

Popup.propTypes = {
  title: PropTypes.string,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};
export default Popup;
