import { useAuth0 } from "@auth0/auth0-react";
import { APIMethods, useAPI } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { PageLoader } from "../components/page-loader";
import { Navigate, useNavigate } from "react-router-dom";
import Toast from "../hooks/useToast";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};


export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [api, response] = useAPI();
  const { user: authUser } = useAuth0();

  const getUser = async () => {
    if (api.businesses) {
      const businesses = api.businesses as APIMethods
      if (authUser?.sub) {
        await businesses.getOne(authUser.sub);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, [])
    
    if (response.status === 0) {
      return <PageLoader />
    }

    if (response.status === 204) {
      return <Navigate to={'/BusinessInit'}/>
    }

    return(
        <> 
            <LogoutButton />
            <h1>Dashboard</h1>
        </>
    )
}