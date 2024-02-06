import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

const Home: React.FC = () => {

    return (
        <>
            <LoginButton />
            <h1>Home</h1>
        </>
    )
}
export default Home