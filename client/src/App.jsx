import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import API from "./services/api";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
    try {
      const res =
        await API.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      window.location.href =
        "/dashboard";
    } catch (error) {
      console.log(
        error.response?.data ||
          error.message
      );

      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "16px",
          width: "320px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Team Manager
        </h1>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={handleLogin}
          style={buttonStyle}
        >
          Login
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const [tasks, setTasks] =
    useState([]);

  const [stats, setStats] =
    useState({});

  const [projects,
    setProjects] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [dueDate,
    setDueDate] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  const [projectTitle,
    setProjectTitle] =
    useState("");

  const [
    projectDescription,
    setProjectDescription,
  ] = useState("");

  const fetchTasks = async () => {
    try {
      const res =
        await API.get("/tasks");

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboard =
    async () => {
      try {
        const res =
          await API.get(
            "/dashboard"
          );

        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  const fetchProjects =
    async () => {
      try {
        const res =
          await API.get(
            "/projects"
          );

        setProjects(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  const createProject =
    async () => {
      try {
        await API.post(
          "/projects",
          {
            title:
              projectTitle,

            description:
              projectDescription,
          }
        );

        fetchProjects();

        setProjectTitle("");

        setProjectDescription(
          ""
        );
      } catch (error) {
        console.log(error);
      }
    };

  const createTask =
    async () => {
      try {
        await API.post(
          "/tasks",
          {
            title,
            description,
            dueDate,
          }
        );

        fetchTasks();

        fetchDashboard();

        setTitle("");

        setDescription("");

        setDueDate("");
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    const loadData =
      async () => {
        await fetchTasks();

        await fetchDashboard();

        await fetchProjects();
      };

    loadData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent:
            "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {[
          {
            label: "Total",
            value:
              stats.totalTasks,
          },
          {
            label:
              "Completed",
            value:
              stats.completedTasks,
          },
          {
            label: "Pending",
            value:
              stats.pendingTasks,
          },
          {
            label: "Overdue",
            value:
              stats.overdueTasks,
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background:
                "#1e293b",
              padding: "20px",
              borderRadius:
                "16px",
              width: "160px",
              textAlign:
                "center",
            }}
          >
            <h2>{item.label}</h2>

            <p
              style={{
                fontSize:
                  "28px",
              }}
            >
              {item.value || 0}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "30px",
        }}
      >
        <div
          style={cardStyle}
        >
          <h2>Create Project</h2>

          <input
            placeholder="Project title"
            value={projectTitle}
            onChange={(e) =>
              setProjectTitle(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Project description"
            value={
              projectDescription
            }
            onChange={(e) =>
              setProjectDescription(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            onClick={createProject}
            style={buttonStyle}
          >
            Create Project
          </button>
        </div>

        <div
          style={cardStyle}
        >
          <h2>Create Task</h2>

          <input
            placeholder="Task title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            onClick={createTask}
            style={buttonStyle}
          >
            Create Task
          </button>
        </div>
      </div>

      <h2
        style={{
          marginTop: "50px",
        }}
      >
        Projects
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        {projects.map(
          (project) => (
            <div
              key={project.id}
              style={cardStyle}
            >
              <h3>
                {project.title}
              </h3>

              <p>
                {
                  project.description
                }
              </p>
            </div>
          )
        )}
      </div>

      <h2
        style={{
          marginTop: "50px",
        }}
      >
        Tasks
      </h2>

      <input
        placeholder="Search Task"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        style={{
          ...inputStyle,
          maxWidth: "300px",
        }}
      />

      <select
        value={filter}
        onChange={(e) =>
          setFilter(
            e.target.value
          )
        }
        style={{
          ...inputStyle,
          maxWidth: "300px",
        }}
      >
        <option value="ALL">
          ALL
        </option>

        <option value="TODO">
          TODO
        </option>

        <option value="IN_PROGRESS">
          IN PROGRESS
        </option>

        <option value="DONE">
          DONE
        </option>
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {tasks
          .filter((task) => {
            const matchesSearch =
              task.title
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesFilter =
              filter === "ALL"
                ? true
                : task.status ===
                  filter;

            return (
              matchesSearch &&
              matchesFilter
            );
          })
          .map((task) => (
            <div
              key={task.id}
              style={cardStyle}
            >
              <h2>
                {task.title}
              </h2>

              <p>
                {
                  task.description
                }
              </p>

              <p>
                Status:
                {" "}
                {task.status}
              </p>

              <p>
                Due:
                {" "}
                {task.dueDate
                  ? new Date(
                      task.dueDate
                    ).toLocaleDateString()
                  : "No Date"}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap:
                    "wrap",
                  gap: "10px",
                  marginTop:
                    "15px",
                }}
              >
                <button
                  style={
                    smallButton
                  }
                  onClick={async () => {
                    await API.put(
                      `/tasks/${task.id}`,
                      {
                        status:
                          "TODO",
                      }
                    );

                    fetchTasks();

                    fetchDashboard();
                  }}
                >
                  TODO
                </button>

                <button
                  style={
                    smallButton
                  }
                  onClick={async () => {
                    await API.put(
                      `/tasks/${task.id}`,
                      {
                        status:
                          "IN_PROGRESS",
                      }
                    );

                    fetchTasks();

                    fetchDashboard();
                  }}
                >
                  IN PROGRESS
                </button>

                <button
                  style={
                    smallButton
                  }
                  onClick={async () => {
                    await API.put(
                      `/tasks/${task.id}`,
                      {
                        status:
                          "DONE",
                      }
                    );

                    fetchTasks();

                    fetchDashboard();
                  }}
                >
                  DONE
                </button>

                <button
                  style={{
                    ...smallButton,
                    background:
                      "#ef4444",
                  }}
                  onClick={async () => {
                    await API.delete(
                      `/tasks/${task.id}`
                    );

                    fetchTasks();

                    fetchDashboard();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <button
          onClick={() => {
            localStorage.removeItem(
              "token"
            );

            window.location.href =
              "/";
          }}
          style={buttonStyle}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "16px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
};

const buttonStyle = {
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const smallButton = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;