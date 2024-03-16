import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PageLoader } from "../components/page-loader";

interface SearchParams {
    zip: number;
    keyword: string;
    radius: number;
}

const SearchResults = () => {
    const { state } = useLocation();
    const [businesses, setBusinesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Get all businesses near the search results
    const getBusinesses = async () => {

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
            setBusinesses(data);
            setIsLoading(false);
        }
    }   

    useEffect(() => {
        if (state === null) {
            navigate("/");
        }

        getBusinesses();
    },[])

    return (
        <>
            {isLoading ? <PageLoader /> 
                : businesses.length === 0 
                ? <p>No services in your area</p> 
                : <p>Services found</p>}
        </>
    )
} 

export default SearchResults