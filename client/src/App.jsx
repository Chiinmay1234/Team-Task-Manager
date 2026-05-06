import { useEffect, useState } from "react";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dashboard, setDashboard] = useState(null);

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

  // FETCH DASHBOARD DATA
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

  useEffect(() => {

    if (token) {
      fetchDashboard();
    }

  }, []);

  // LOGIN SCREEN
  if (!token) {
    return (
      <div style={{
        fontFamily: "Arial",
        padding: "40px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh"
      }}>

        <h1>Team Task Manager</h1>

        <div style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
          width: "300px"
        }}>

          <h2>Login</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px"
              }}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px"
              }}
            />

            <button
              type="submit"
              style={{
                padding: "10px",
                width: "100%",
                backgroundColor: "black",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Login
            </button>

          </form>

        </div>

      </div>
    );
  }

  // DASHBOARD SCREEN
  return (
    <div style={{
      fontFamily: "Arial",
      padding: "40px",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
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
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        width: "350px"
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

    </div>
  );
}

export default App;