import React, { useEffect, useState }  from 'react';
import { useLocalState } from "../util/useLocalStorage";
import "./cars.css"

const Cars = () => {
    const [jwt,setJwt] = useLocalState("", "jwt");
    const [cars,setCars]=useState([]);
    useEffect(()=>{
        fetch("/api/v1/cars",{
            headers:{
                "content-type" : "application/json",
                Authorization : `Bearer ${jwt}`,
            },
            method :"GET",
        }).then((response)=>{
            if(response.status === 200) return response.json(); 
        }).then(data=> setCars(data));
        
    },[]);

    function sendMeHome(){
        window.location.href = "/";
    }
    function sendMeToCars(){
        window.location.href = "/cars";
    }
    function sendMeToReservation(){
        window.location.href ="/dashboard";
    }
    function sendMeToNewReservation(){
        window.location.href ="/reservation";
    }
        
    return (
        <div>
            <div className='NavBar'>
                <button onClick={(e)=>sendMeHome()}>Home</button>
                <button onClick={(e)=>sendMeToCars()}>Cars</button>
                <button onClick={(e)=>sendMeToReservation()}>Reservations</button>
                <button onClick={(e)=>sendMeToNewReservation()}>New Reservation</button>
                <button>Logout</button>
                </div>
                <h3>This is all cars available</h3>
            <ul>
                    {cars.map(car=>(
                        <li key={car.id}>
                            {car.id +" "}
                            {car.brand +" "}
                            {car.modelYear+" "}
                            {car.rentalPrice+" "}
                        </li>
                    ))}
                </ul>
                <div>

                </div>
        </div>
    );
};

export default Cars;