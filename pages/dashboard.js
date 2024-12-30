import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/activation"); // เปลี่ยนไปหน้า login ถ้ายังไม่ได้ล็อกอิน
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // แสดงหน้าเปล่าระหว่างรอ redirect
  }

  return (
    <div>
      <h1>Dashboard Page</h1>
    </div>
  );
};

export default Dashboard;
