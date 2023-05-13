import React from 'react';

const BookingRow = ({ booking, handleDelete, handleBookingConfirm }) => {
  const { _id, customerName, email, service, img, date, price,status } = booking;

  return (
    <tr>
      <th>
        <label>
          <button onClick={() => handleDelete(_id)} className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {img && <img src={img} />}
            </div>
          </div>
          <div>
            <div className="font-bold">{customerName}</div>
            <div className="text-sm opacity-50"></div>
          </div>
        </div>
      </td>
      <td>{email}</td>
      <td> {service} </td>
      <th>
        <button className="btn btn-ghost btn-xs">{price}</button>
      </th>
      <th>
        <button className="btn btn-ghost btn-xs">{date}</button>
      </th>
      <th>
        {status === 'confirm' ? (
          <span className="text-primary font-bold">confirmed</span>
        ) : (
          <button
            onClick={()=>handleBookingConfirm(_id)}
            className="btn btn-ghost btn-xs"
          >
            Please Confirm
          </button>
        )}
      </th>
    </tr>
  );
};

export default BookingRow;