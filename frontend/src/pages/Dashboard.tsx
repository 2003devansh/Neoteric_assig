/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Card } from "antd";

const BASE_URL = "http://localhost:2000";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/dashboard`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
      window.location.href = "/"; // redirect if unauthorized
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    fetchDashboard();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Leads" bordered>
          <p className="text-2xl font-bold text-blue-500">
            {data?.totalLeads ?? 0}
          </p>
        </Card>

        <Card title="Total Tasks" bordered>
          <p className="text-2xl font-bold text-green-500">
            {data?.totalTasks ?? 0}
          </p>
        </Card>

        <Card title="Leads Status" bordered>
          {data?.statusBreakdown?.length ? (
            data.statusBreakdown.map((s: any) => (
              <p key={s.status}>
                {s.status}: {s._count}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No data</p>
          )}
        </Card>
      </div>
    </div>
  );
}
