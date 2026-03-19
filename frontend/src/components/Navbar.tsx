import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-4 bg-white shadow">
      <h1 className="font-bold">Mini CRM</h1>

      <div className="flex gap-2">
        <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
        <Button onClick={() => navigate("/leads")}>Leads</Button>
        <Button onClick={() => navigate("/tasks")}>Tasks</Button>

        <Button
          danger
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
