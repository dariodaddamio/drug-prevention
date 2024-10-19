import { useState } from "react";

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { text: "Complete RFP application by October 25th", completed: false },
    { text: "CUSD Drug Prevention Event on November 15th", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEdit = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, text: editingText } : task
      )
    );
    setEditingIndex(null);
    setEditingText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, index?: number) => {
    if (e.key === "Enter") {
      if (index !== undefined) {
        saveEdit(index);
      } else {
        addTask();
      }
    }
  };

  return (
    <div className="bg-myblack p-6 mr-4 rounded-lg w-1/2">
      <h2 className="font-[Montserrat] font-bold text-2xl text-myoffwhite mb-4 font-outfit">
        To Do List
      </h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          className="font-[Outfit] p-2 rounded w-full font-montserrat"
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="font-[Outfit] mt-2 bg-mymint text-myblack p-2 rounded w-full"
        >
          Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`p-2 rounded flex justify-between items-center font-[Outfit] ${
              task.completed ? "bg-mymint line-through" : "bg-mymint"
            }`}
          >
            {editingIndex === index ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="p-1 mr-2 rounded w-full font-[Outfit]"
              />
            ) : (
              <span
                onClick={() => toggleTaskCompletion(index)}
                className="cursor-pointer"
              >
                {task.text}
              </span>
            )}
            <div className="flex space-x-2">
              {editingIndex === index ? (
                <button
                  onClick={() => saveEdit(index)}
                  className="text-myblack font-montserrat"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditing(index)}
                  className="text-myblack font-montserrat"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => removeTask(index)}
                className="text-myblack font-montserrat"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
