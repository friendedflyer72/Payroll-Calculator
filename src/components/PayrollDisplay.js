import React from 'react';

const PayrollDisplay = ({ payDetails, mode }) => {
  const totalPay = payDetails.reduce((acc, day) => acc + day.pay, 0);

  return (
    <div className={`p-6 max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-b-xl shadow-md space-y-4`}>
      <h2 className='text-2xl font-bold'>Payroll Details</h2>
      <ul>
        {payDetails.map((day, index) => (
          <li key={index}>
            Date: {day.date || 'N/A'}, Day: {day.day}, Duration: {day.duration} hours - ${day.pay.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total Pay: ${totalPay.toFixed(2)}</h3>
    </div>
  );
};

export default PayrollDisplay;
