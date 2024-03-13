import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../hooks/useApi";
import useToast from "../hooks/useToast";

interface NavbarProps {
    location: string
};

const LogoutButton = () => {
    const { logout } = useAuth0();
  
    return (
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
    );
  };

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
  };

const Navbar: React.FC<NavbarProps> = (NavbarProps) => {
    const [api, response] = useAPI();

    // toast
    const [Toast, setToast] = useToast();

    const resetDatabase = async () => {
        if (api.reset){
          api.reset()
        }
        setToast("Database Reset")
      }
    return(
        <>
            <div className="nav">
                <a href="/"><img id="logo" src="/bookme-word-logo.png" alt="Bookme" /></a>
                <ul className="nav-list">
                    {NavbarProps.location.match("Dashboard") !== null ? <LogoutButton /> : <></>}
                    {NavbarProps.location === "/Dashboard" ? <button onClick={()=>resetDatabase()}>Reset Database</button> : <></>}
                    {NavbarProps.location === "/Vendors" ? <LoginButton /> : <></>}
                    {NavbarProps.location === "/" ? <button><a href="/Vendors">Vendors</a></button> : <></>}
                </ul>
            </div>
            <Toast/>
        </>
    )
}

export default Navbar