/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Table, Button, Select, Input, message } from "antd";
import Navbar from "../components/Navbar";

const BASE_URL = "http://localhost:2000";

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  // FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await fetch(`${BASE_URL}/leads`, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();
      setLeads(data);
    } catch {
      message.error("Session expired, please login again");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }

    fetchLeads();
  }, []);

  // ADD LEAD
  const addLead = async () => {
    if (!name) {
      message.warning("Enter lead name");
      return;
    }

    try {
      await fetch(`${BASE_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          name,
          phone: "123",
          requirement: "Test",
        }),
      });

      setName("");
      message.success("Lead added");
      fetchLeads();
    } catch {
      message.error("Failed to add lead");
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`${BASE_URL}/leads/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ status }),
      });

      fetchLeads();
    } catch {
      message.error("Failed to update status");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        {/* Add Lead */}
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Lead name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button type="primary" onClick={addLead}>
            Add Lead
          </Button>
        </div>

        {/* Leads Table */}
        <Table
          dataSource={leads}
          rowKey="id"
          className="bg-white rounded-lg shadow"
          columns={[
            { title: "Name", dataIndex: "name" },
            { title: "Phone", dataIndex: "phone" },
            { title: "Requirement", dataIndex: "requirement" },
            {
              title: "Status",
              render: (record) => (
                <Select
                  value={record.status}
                  style={{ width: 140 }}
                  onChange={(value) => updateStatus(record.id, value)}
                  options={[
                    { label: "New", value: "NEW" },
                    { label: "Contacted", value: "CONTACTED" },
                    { label: "Closed", value: "CLOSED" },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
