import React from 'react';
import { Service } from '../types/Service';

interface ServiceCardProps {
    service: Service;
    id: number;
    key: number;
    handleClick: (id:number) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, id, handleClick }) => {

    return (
            <div 
                key={id} 
                className="service-card"
                onClick={()=>handleClick(service.id)}
                >
                <h2>{service.name}</h2>
                <p>{service.description}</p>
            </div>
    );
};

export default ServiceCard;