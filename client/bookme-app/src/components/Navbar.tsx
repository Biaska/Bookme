import { useAuth0 } from "@auth0/auth0-react";
import { useAPI } from "../hooks/useApi";
import useToast from "./Toast";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <a onClick={() => loginWithRedirect()}>Log In</a>;
  };

const Navbar: React.FC = () => {
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
                    <li><button onClick={()=>resetDatabase()}>Reset Database</button></li>
                    <li className="nav-item"><LoginButton /></li>
                </ul>
            </div>
            <Toast/>
        </>
    )
}

export default Navbar