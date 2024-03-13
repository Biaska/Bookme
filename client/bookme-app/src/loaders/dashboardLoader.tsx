import { useAuth0 } from "@auth0/auth0-react";
import { APIMethods, useAPI } from "../hooks/useApi";
import { useEffect, useState } from "react";
import { PageLoader } from "../components/page-loader";
import { Navigate, useNavigate } from "react-router-dom";
import Toast from "../hooks/useToast";

const DashboardLoader = async () => {
    const [businessAPI, businessResponse] = useAPI();
  const [serviceAPI, serviceResponse] = useAPI();
  const { user: authUser } = useAuth0();
  const [services, setServices] = useState<any[]>([]);
  const isLoading = businessResponse.loading && serviceResponse.loading
  const navigate = useNavigate();


  if (businessAPI.businesses) {
    const businesses = businessAPI.businesses as APIMethods
    if (authUser?.sub) {
      await businesses.getOne(authUser.sub);
    }
    if (businessResponse.status === 204) {
      navigate('/BusinessInit');
    }
  }
  
  if (serviceAPI.businessServices) {
    const services = serviceAPI.businessServices as APIMethods
    if (authUser?.sub) {
      await services.getOne(authUser.sub);
      if (serviceResponse.status === 200) {
        setServices(serviceResponse.data);
      }
    }
  }
  
  return(services)
}
export default DashboardLoader;