import AdminDashboard from "../components/AdminDashboard"
import UserDashboard from "../components/UserDashboard"
import { Navigate } from "react-router-dom";

import { useAuth } from '../AuthContext'; // Import useAuth

export default function Dashboard() {

  const {user} = useAuth();

    return (
      <>
      {user ? (
          user.isAdmin ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )
        ) : (
          <Navigate to="/" />
        )
      }
      </>
    )
}

