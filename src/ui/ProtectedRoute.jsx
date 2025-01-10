import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "./Spinner";

import { useUser } from "../features/authentication/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. CHECK IF THERE IS A CURRENT USER SESSION
  const { isAuthenticated, isLoading } = useUser();

  // 2. IF NOT AUTHENTICATED, REDIRECT TO LOGIN PAGE
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect unauthenticated users to /login
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3. SHOW LOADING SPINNER WHILE CHECKING
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. IF AUTHENTICATED, REDIRECT TO DASHBOARD
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
