import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const BookService = () => {
  const services = useLoaderData();
  const {_id,title,price,img} = services;
  const {user} = useContext(AuthContext);

  const bookingHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const email = user?.email;
    const booking = {
        customerName : name,
        email,
        img,
        date,
        service:title,
        service_id:_id,
        price: price
    }
    console.log(booking);
    fetch('http://localhost:5000/bookings', {
      method: "POST",
      headers:{
        'content-type': 'application/json',
      },
      body:JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId){
             Swal.fire({
               title: "Success!",
               text: "User Added Successfully",
               icon: "success",
               confirmButtonText: "Cool",
             });
        }
      });
  }
  return (
    <div>
      <h1 className="text-center font-bold mb-10 text-red-600 text-2xl">
        Booking Service {services.title}
      </h1>
      <form
        onSubmit={bookingHandler}
        className="flex flex-wrap justify-between"
      >
        <div className="w-full md:w-1/2 px-3 mb-10 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="input-left"
          >
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input-left"
            name="name"
            defaultValue={user?.displayName}
            type="text"
            placeholder="Enter text here..."
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="input-right"
          >
            Date
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input-right"
            type="date"
            name="date"
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-10 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="input-left"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input-left"
            type="email"
            name="email"
            defaultValue={user?.email}
            placeholder="Enter text here..."
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="input-right"
          >
            Deo Amount
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="input-right"
            type="text"
            name="price"
            defaultValue={"$" + price}
            placeholder="Enter text here..."
          />
        </div>
        <div className="w-full px-3 pb-10 md:mb-0">
          <input className="btn btn-block" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default BookService;
