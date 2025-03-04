import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (isAuthenticated) {
    return navigate("/dashboard", { replace: true });
  }

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Welcome To The Wild Oasis</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
