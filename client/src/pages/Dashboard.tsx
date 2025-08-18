// local imports
import { APIMethods, useAPI } from "../hooks/useApi";
import { PageLoader } from "../components/page-loader";
import ServiceCard from "../components/ServiceCard";

// library imports
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [businessAPI, businessResponse] = useAPI();
  const [serviceAPI, serviceResponse] = useAPI();
  const { user } = useAuth0();
  const [services, setServices] = useState<any[]>([]);
  let isLoading = businessResponse.loading && serviceResponse.loading
  const navigate = useNavigate();

  // Go to business view of service details page
  const handleServiceClick = (id: number) => {
      navigate(`/BusinessService/${id}`)
  }

  // Get the user and validate that the business is initialized
  const getUser = async () => {
    if (businessAPI.businesses) {
      const businesses = businessAPI.businesses as APIMethods
      if (user?.sub) {
        await businesses.getOne(user.sub);
      }
      if (businessResponse.status === 204) {
        navigate('/BusinessInit');
      }
    }
  }

  // After verifying the business is verified to host services, 
  // get the services that the business currently is hosting. 
  const getServices = async () => {
    if (serviceAPI.businessServices) {
      const services = serviceAPI.businessServices as APIMethods
      if (user?.sub) {
        await services.getOne(user.sub);
        if (serviceResponse.status === 200) {
          setServices(serviceResponse.data);
        }
      }
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  useEffect(() => {
    getServices();
  }, [businessResponse.status]);
    
    if (isLoading === true) {
      return <PageLoader />
    }

    return(
        <> 
            <div className="services-dashboard">
              <div className="services-header">
                <button><a href="/CreateService">Create Service</a></button>
              </div>
              {services.length === 0 ? <h2>You have not created any services. Create a service to manage them.</h2> : 
              <>
                <h2>Services</h2>
                {services.map((service, id) => (
                  <ServiceCard key={id} service={service} id={id} handleClick={handleServiceClick}/>
                ))}
              </>
              }
            </div>
        </>
    )
}