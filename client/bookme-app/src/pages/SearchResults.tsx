import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageLoader } from "../components/page-loader";
import ServiceCard from "../components/ServiceCard";

interface SearchParams {
    zip: number;
    keyword: string;
    radius: number;
}

const SearchResults = () => {
    const { state } = useLocation();
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleServiceClick = (id:number) => {
        navigate(`/ServiceDetails/${id}`);
    }

    // Get all businesses near the search results
    const getServices = async () => {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    zipCode: state.zip,
                    keyword: state.keyword,
                    radius: state.miles,
                }
            )
        }
        const response = await fetch('http://localhost:6060/search', options);
        
        if (response.status === 200) {
            const data = await response.json(); 
            console.log(data)
            setServices(data);
            setIsLoading(false);
        }
    }   

    useEffect(() => {
        if (state === null) {
            navigate("/");
        }

        getServices();
    },[])

    return (
        <>
            <div className="search-results-container">
                {isLoading ? <PageLoader /> 
                    : services.length === 0 
                    ? <p>No services in your area</p> 
                    : <p className="search-result-text">
                        {services.length === 1 
                        ? services.length + " service found..."
                        : services.length + " services found..." 
                    }
                    </p>
                }
                {services && services.map((service, id)=> (
                    <ServiceCard service={service} id={id} key={id} handleClick={handleServiceClick}/>
                ))}
            </div>
        </>
    )
} 

export default SearchResults