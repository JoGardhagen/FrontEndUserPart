import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocalState } from "../util/useLocalStorage";

const Dashboard = () => {

    const [jwt,setJwt] = useLocalState("", "jwt");

    const [assignments,setAssignments] = useState(null);
    const [reservations,setReservations] = useState([]);

    useEffect(()=>{
        fetch("api/v1/myorders",{
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
        }).then(response =>{
            if(response.status === 200)return response.json();
        }).then((reservationData)=>{
            setReservations(reservationData);
            console.log(reservationData);
        })
    },[])

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
            
        <div style={{margin:"2em"}}>
             
             
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>CAR ID</th>
                            <th>BRAND</th>
                            <th>YEAR</th>
                            <th>PRICE</th>
                            <th>ID_User</th>
                            <th>NAME</th>
                            <th>START</th>
                            <th>END</th>
                            <th>BOOKDATE</th>
                            <th>DAYS</th>
                            <th>COST</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation,index)=>{
                        return(
                            <tr key={index}>
                                <th scope="row">{reservation.id}</th>
                                <td>{reservation.id +" "}</td>
                                   <td> {reservation.car.id +" "}</td>             
                                   <td> {reservation.car.brand +" "}  </td>           
                                   <td> {reservation.car.modelYear +" "}   </td> 
                                   <td> {reservation.car.rentalPrice +" "}  </td>
                                   <td> {reservation.userEntity.id+" "}         </td>
                                   <td> {reservation.userEntity.username+" "}   </td>
                                   <td> {reservation.startDate+" "}    </td>
                                   <td> {reservation.endingDate+" "}</td>
                                   <td> {reservation.bookingDate+" "}   </td>
                                   <td> {reservation.rentalDays+" "}</td>
                                   <td> {reservation.rentalDays * reservation.car.rentalPrice }</td>         
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
            
             {reservations?reservations.map(reservation =>(
                <div>
                    <Link to={`/reservation/${reservation.id}`}>Reservation : ID {reservation.id}</Link>
                </div>
             )):(
                <></>
             )}        
             </div>
        
        </div>
        
    );
};

export default Dashboard;