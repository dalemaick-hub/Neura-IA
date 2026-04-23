import { useNavigate } from "react-router-dom";
import Landing from "./Landing";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Landing
      onStart={() => navigate(user ? "/chat" : "/signin")}
    />
  );
}
