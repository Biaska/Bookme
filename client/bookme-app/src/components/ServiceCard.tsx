import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Service {
    name: string;
    description: string;
}

interface ServiceCardProps {
    service: Service;
    id: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, id }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/Service/${id}`);
    }

    return (
            <div 
                key={id} 
                className="service-card"
                onClick={()=>handleClick()}
                >
                <h2>{service.name}</h2>
                <p>{service.description}</p>
            </div>
    );
};

export default ServiceCard;