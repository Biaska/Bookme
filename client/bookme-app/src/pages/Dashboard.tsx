import { useAuth0 } from "@auth0/auth0-react";
import { APIMethods, useAPI } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { PageLoader } from "../components/page-loader";
import { Navigate, useNavigate } from "react-router-dom";
import Toast from "../hooks/useToast";



export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [api, response] = useAPI();
  const { user: authUser } = useAuth0();
  const [services, setServices] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    if (api.businesses) {
      const businesses = api.businesses as APIMethods
      if (authUser?.sub) {
        await businesses.getOne(authUser.sub);
      }
      if (response.status === 204) {
        navigate('/BusinessInit');
      }
    }
    const serverResponse = await fetch(`http://localhost:6060/businessService/${authUser?.sub}`);
    const data = await serverResponse.json();
    if (data.status === 200) {
      setServices(data.body);
    }
  }

  useEffect(() => {
    getUser();
  }, [])
    
    if (response.status === 0) {
      return <PageLoader />
    }

    return(
        <> 
            <div className="services-dashboard">
              <div className="services-header">
                <button><a href="/CreateService">Create Service</a></button>
              </div>
              {services === null ? <h2>You have not created any services. Create a service to manage them.</h2> : <p>Services</p>}
            </div>
        </>
    )
}