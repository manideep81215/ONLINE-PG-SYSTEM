import "./DashboardLayout.css";
import NavBar from "../components/NavBar";

function DashboardLayout({ title, children, showSidebar = true }) {
  return (
    <div className="dashboard-wrapper">
      <NavBar title={title} />

      <div className="dashboard-body">
        {showSidebar && <div className="sidebar-placeholder" />}
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
