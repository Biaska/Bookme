import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAPI, APIMethods } from "../hooks/useApi"
import { PageLoader } from "../components/page-loader";
import { Service } from "../types/Service";
import CreateSchedule from "../components/CreateSchedule";


export default function BusinessService() {
    let { serviceID } = useParams();
    const [error, setError] = useState(false);
    const [service, setService] = useState<Service | undefined>();
    const [api, response] = useAPI();

    const getService = async () => {
        if (api.services) {
            const services = api.services as APIMethods
            if (serviceID === undefined){
                setError(true)
            } else {
                await services.getOne(serviceID)
                .then(() => {
                    if (response.status === 200) {
                        console.log("Set Service: " + response.data)
                        setService(response.data)
                    }
                })
            }
        }
    }

    useEffect(() => {
        getService();
    }, [serviceID])

    if (error) return (
        <p>Error getting service.</p>
    )

    if (response.loading === true) return (
        <PageLoader />
    )

    
    return (
        <>
            {response.data && 
                <div>
                    <h1>Service Details</h1>
                    <h2>{response.data.name}</h2>
                    <p>Description: {response.data.description}</p>
                    {serviceID === undefined ? <PageLoader />
                    : 
                        <div>
                            <h2>Create Schedule</h2>
                            <CreateSchedule serviceID={parseInt(serviceID)} />
                        </div>
                    }
                </div>
            }
        </>
    )
}