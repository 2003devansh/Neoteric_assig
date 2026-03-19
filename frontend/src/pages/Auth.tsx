/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Input, Button, Tabs, message } from "antd";
import { useState } from "react";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:2000";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //   console.log("rtfgyhjkl", localStorage.getItem("token"));
  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      saveToken(data.token);
      message.success("Login successful");

      navigate("/dashboard");
    } catch (err: any) {
      message.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      message.success("Registered successfully, please login");

      setActiveTab("login");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      message.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-500">
      <Card className="w-95 shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4">Mini CRM</h2>

        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            setEmail("");
            setPassword("");
          }}
          centered
        >
          <Tabs.TabPane tab="Login" key="login">
            <Input
              placeholder="Email"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input.Password
              placeholder="Password"
              className="mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="primary"
              block
              loading={loading}
              onClick={handleLogin}
            >
              Login
            </Button>

            <p className="text-center mt-3 text-gray-500 text-sm">
              Didn’t register?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setActiveTab("register")}
              >
                Register first
              </span>
            </p>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Register" key="register">
            <Input
              placeholder="Email"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input.Password
              placeholder="Password"
              className="mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="primary"
              block
              loading={loading}
              onClick={handleRegister}
            >
              Register
            </Button>

            <p className="text-center mt-3 text-gray-500 text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setActiveTab("login")}
              >
                Login
              </span>
            </p>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
