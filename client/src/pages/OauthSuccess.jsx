// OauthSuccess.jsx
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

const OauthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { storeTokenIns } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      storeTokenIns(token);
      navigate("/"); // redirect to homepage or dashboard
    } else {
      navigate("/login"); // fallback if no token
    }
  }, []);

  return <p>Authenticating...</p>;
};

export default OauthSuccess;
