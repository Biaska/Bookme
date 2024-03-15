import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../types/Service';

interface ServiceCardProps {
    service: Service;
    id: number;
    key: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, id }) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/BusinessService/${service.id}`);
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