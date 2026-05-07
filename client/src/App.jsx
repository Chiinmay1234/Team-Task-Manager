import { useEffect, useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dashboard, setDashboard] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const token = localStorage.getItem("token");

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://team-task-manager-production-ab9e.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      localStorage.setItem("token", data.token);

      alert(data.message);

      window.location.reload();

    } catch (error) {

      console.log(error);

    }

  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  // FETCH DASHBOARD
  const fetchDashboard = async () => {

    try {

      const response = await fetch(
        "https://team-task-manager-production-ab9e.up.railway.app/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setDashboard(data);

    } catch (error) {

      console.log(error);

    }

  };

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const response = await fetch(
        "https://team-task-manager-production-ab9e.up.railway.app/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setTasks(Array.isArray(data) ? data : []);

    } catch (error) {

      console.log(error);

      setTasks([]);

    }

  };

  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const response = await fetch(
        "https://team-task-manager-production-ab9e.up.railway.app/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setProjects(Array.isArray(data) ? data : []);

    } catch (error) {

      console.log(error);

    }

  };

  // CREATE TASK
  const createTask = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://team-task-manager-production-ab9e.up.railway.app/api/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      if (response.ok) {

        setTitle("");
        setDescription("");

        fetchTasks();
        fetchDashboard();

      }

    } catch (error) {

      console.log(error);

    }

  };

  // CREATE PROJECT
  const createProject = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "https://team-task-manager-production-ab9e.up.railway.app/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: projectTitle,
            description: projectDescription,
          }),
        }
      );

      if (response.ok) {

        setProjectTitle("");
        setProjectDescription("");

        fetchProjects();

      }

    } catch (error) {

      console.log(error);

    }

  };

  // UPDATE TASK STATUS
  const updateTaskStatus = async (id, status) => {

    try {

      await fetch(
        `https://team-task-manager-production-ab9e.up.railway.app/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      fetchTasks();
      fetchDashboard();

    } catch (error) {

      console.log(error);

    }

  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await fetch(
        `https://team-task-manager-production-ab9e.up.railway.app/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
      fetchDashboard();

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    if (token) {

      fetchDashboard();
      fetchTasks();
      fetchProjects();

    }

  }, []);

  // LOGIN PAGE
  if (!token) {

    return (

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-[350px]">

          <h1 className="text-3xl font-bold text-center mb-6">
            Team Task Manager
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    );

  }

  // DASHBOARD
  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Team Task Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-3xl font-bold">
            {dashboard?.totalTasks || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-3xl font-bold text-green-500">
            {dashboard?.completedTasks || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-3xl font-bold text-yellow-500">
            {dashboard?.pendingTasks || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">Overdue</h2>
          <p className="text-3xl font-bold text-red-500">
            {dashboard?.overdueTasks || 0}
          </p>
        </div>

      </div>

      {/* CREATE PROJECT */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8 max-w-xl">

        <h2 className="text-2xl font-bold mb-4">
          Create Project
        </h2>

        <form onSubmit={createProject} className="space-y-4">

          <input
            type="text"
            placeholder="Project Title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Project Description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
          >
            Create Project
          </button>

        </form>

      </div>

      {/* PROJECTS */}
      <div className="mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Projects
        </h2>

        <div className="grid gap-4">

          {projects.map((project) => (

            <div
              key={project._id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <h3 className="text-xl font-bold">
                {project.title}
              </h3>

              <p className="text-gray-600 mt-2">
                {project.description}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* CREATE TASK */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8 max-w-xl">

        <h2 className="text-2xl font-bold mb-4">
          Create Task
        </h2>

        <form onSubmit={createTask} className="space-y-4">

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Create Task
          </button>

        </form>

      </div>

      {/* TASKS */}
      <div>

        <h2 className="text-2xl font-bold mb-4">
          Tasks
        </h2>

        <div className="grid gap-4">

          {Array.isArray(tasks) && tasks.map((task) => (

            <div
              key={task._id}
              className="bg-white p-6 rounded-2xl shadow"
            >

              <h3 className="text-xl font-bold mb-2">
                {task.title}
              </h3>

              <p className="text-gray-600 mb-3">
                {task.description}
              </p>

              <p className="mb-4">
                Status:
                <span className="font-semibold ml-2">
                  {task.status}
                </span>
              </p>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    updateTaskStatus(task._id, "Completed")
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Complete
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default App;