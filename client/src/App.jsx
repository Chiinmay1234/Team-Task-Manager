import { useEffect, useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dashboard, setDashboard] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("https://team-task-manager-production-ab9e.up.railway.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

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

      const response = await fetch("https://team-task-manager-production-ab9e.up.railway.app/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setDashboard(data);

    } catch (error) {

      console.log(error);

    }
  };

  // FETCH TASKS
  const fetchTasks = async () => {

    try {

      const response = await fetch("https://team-task-manager-production-ab9e.up.railway.app/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setTasks(data);

    } catch (error) {

      console.log(error);

    }
  };

  // CREATE TASK
  const createTask = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch("https://team-task-manager-production-ab9e.up.railway.app/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {

        setTitle("");
        setDescription("");

        fetchTasks();

      }

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE TASK STATUS
  const updateTaskStatus = async (id, status) => {

    try {

      await fetch(`https://team-task-manager-production-ab9e.up.railway.app/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status,
        }),
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await fetch(`https://team-task-manager-production-ab9e.up.railway.app/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTasks();

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    if (token) {
      fetchDashboard();
      fetchTasks();
    }

  }, []);

  // LOGIN PAGE
  if (!token) {
    return (
      <div style={{
        fontFamily: "Arial",
        padding: "40px",
      }}>

        <h1>Team Task Manager</h1>

        <form onSubmit={handleLogin} style={{
          width: "300px",
        }}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button type="submit" style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "black",
            color: "white",
            border: "none",
          }}>
            Login
          </button>

        </form>

      </div>
    );
  }

  // DASHBOARD
  return (
    <div style={{
      fontFamily: "Arial",
      padding: "40px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh",
    }}>

      <h1>Team Task Manager Dashboard</h1>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px",
          marginBottom: "20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      {/* DASHBOARD STATS */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        width: "350px",
      }}>

        <h2>Dashboard Stats</h2>

        {dashboard ? (
          <>
            <p>Total Tasks: {dashboard.totalTasks}</p>
            <p>Completed Tasks: {dashboard.completedTasks}</p>
            <p>Pending Tasks: {dashboard.pendingTasks}</p>
            <p>Overdue Tasks: {dashboard.overdueTasks}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}

      </div>

      {/* CREATE TASK */}
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
        width: "400px",
      }}>

        <h2>Create Task</h2>

        <form onSubmit={createTask}>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              backgroundColor: "black",
              color: "white",
              border: "none",
            }}
          >
            Create Task
          </button>

        </form>

      </div>

      {/* TASK LIST */}
      <div>

        <h2>Tasks</h2>

        {tasks.map((task) => (

          <div
            key={task._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "15px",
              width: "400px",
            }}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <button
              onClick={() =>
                updateTaskStatus(task._id, "Completed")
              }
              style={{
                padding: "8px",
                marginRight: "10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
              }}
            >
              Complete
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{
                padding: "8px",
                backgroundColor: "red",
                color: "white",
                border: "none",
              }}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;