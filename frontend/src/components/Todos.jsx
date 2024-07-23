import { useState, useEffect } from "react";
import axios from "axios";

import TodoStatusContainer from "./TodoStatusContainer";

import { FaCheck } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

import DeleteConfirmation from "./Deleteconfirmation";
import Popup from "./Popup";

const SERVER_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_SERVER_URL
    : "http://localhost:3000";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/v1/todos`);

        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  const [newTodoFormData, setNewTodoFormData] = useState({
    title: "",
    description: "",
  });

  const [editTodoFormData, setEditTodoFormData] = useState({
    id: "",
    title: "",
    description: "",
    status: "",
  });

  const [isCreateTodoActive, setIsCreateTodoActive] = useState(false);

  const [editTodoID, setEditTodoID] = useState(null);
  const [isEditTodoActive, setIsEditTodoActive] = useState(false);

  const [deleteTodoID, setDeleteTodoID] = useState(null);
  const [deleteTaskConfirmation, setDeleteTaskConfirmation] = useState(false);

  // Function to filter todos based on status
  const filterTodos = (status) => {
    return todos.filter((todo) => todo.status === status);
  };

  // Handler for creating a new todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/v1/todos`,
        newTodoFormData
      );

      const newTodo = response.data;

      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }

    // Clear form data and close create todo popup
    setNewTodoFormData({ title: "", description: "" });
    setIsCreateTodoActive(false);
  };

  // Handler for editing an existing todo
  const handleEditTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${SERVER_URL}/api/v1/todos/${editTodoID}`,
        editTodoFormData
      );

      const updatedTodo = response.data;

      const updatedTodos = todos.map((todo) =>
        todo.id === editTodoID ? updatedTodo : todo
      );

      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error editing todo:", error);
    }

    setEditTodoID(null);
    setIsEditTodoActive(false);
  };

  // Handler for marking a todo as completed
  const handleCheckedTodo = async (id) => {
    try {
      const response = await axios.patch(`${SERVER_URL}/api/v1/todos/${id}`, {
        status: "completed",
      });

      const updatedTodo = response.data;

      const updatedTodoList = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );

      setTodos(updatedTodoList);
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  // Handler for deleting a todo
  const handleDeleteTodo = async () => {
    try {
      await axios.delete(`${SERVER_URL}/api/v1/todos/${deleteTodoID}`);
      const updatedTodoList = todos.map((todo) =>
        todo.id === deleteTodoID ? { ...todo, status: "deleted" } : todo
      );

      setTodos(updatedTodoList);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }

    setDeleteTodoID(null);
    setDeleteTaskConfirmation(false);
  };

  // Function to show delete confirmation popup
  const showDeleteConfirmation = (id) => {
    setDeleteTodoID(id);
    setDeleteTaskConfirmation(true);
  };

  // Function to show edit todo popup
  const showEditTodo = (id) => {
    const selectedTodo = todos.filter((todo) => todo.id === id)[0];
    setEditTodoID(id);
    setEditTodoFormData(selectedTodo);
    setIsEditTodoActive(true);
  };

  return (
    <>
      <div id="title" className="text-stone-500 text-4xl font-black my-12">
        Organize your <span className="text-black">To-Dos</span>
      </div>
      <div className="flex space-x-16">
        <TodoStatusContainer
          title="Ongoing"
          todos={filterTodos("ongoing")}
          icon={
            <FaArrowRotateRight
              className="bg-yellow-400 text-white p-2 rounded-md"
              size={30}
            />
          }
          onDelete={showDeleteConfirmation}
          onChecked={handleCheckedTodo}
          onEdit={showEditTodo}
        />
        <TodoStatusContainer
          title="Completed"
          todos={filterTodos("completed")}
          icon={
            <FaCheck
              className="bg-green-500 text-white p-2 rounded-md"
              size={30}
            />
          }
          onDelete={showDeleteConfirmation}
          onChecked={handleCheckedTodo}
          onEdit={showEditTodo}
        />
      </div>
      <div className="flex justify-center items-center mt-16">
        <div
          className="bg-blue-500 text-white text-xl rounded-3xl p-8 py-3 font-semibold tracking-wide flex justify-center items-center gap-4 cursor-pointer shadow-2xl"
          onClick={() => setIsCreateTodoActive(true)}
        >
          Add a Task{" "}
          <IoIosAddCircle className="inline cursor-pointer" size={30} />
        </div>
      </div>

      {/* Create New Todo Popup */}
      {isCreateTodoActive && (
        <Popup
          title="Enter Task Details"
          onSubmit={handleCreateTodo}
          formData={newTodoFormData}
          setFormData={setNewTodoFormData}
          onClose={() => setIsCreateTodoActive(false)}
        />
      )}

      {/* Edit Todo Popup */}
      {isEditTodoActive && (
        <Popup
          title="Edit Task Details"
          onSubmit={handleEditTodo}
          formData={editTodoFormData}
          setFormData={setEditTodoFormData}
          onClose={() => setIsEditTodoActive(false)}
        />
      )}

      {/* Delete Confirmation Popup */}
      {deleteTaskConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDeleteTodo}
          onCancel={() => setDeleteTaskConfirmation(false)}
        />
      )}
    </>
  );
};

export default Todos;