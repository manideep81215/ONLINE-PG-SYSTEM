import "./RoleSelector.css";

function RoleSelector({ role, setRole }) {
  return (
    <div className="role-selector">
      <button
        className={role === "student" ? "role-btn active" : "role-btn"}
        onClick={() => setRole("student")}
      >
        Student
      </button>

      <button
        className={role === "warden" ? "role-btn active" : "role-btn"}
        onClick={() => setRole("warden")}
      >
        Warden
      </button>
    </div>
  );
}

export default RoleSelector;
