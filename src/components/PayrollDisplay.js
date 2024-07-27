import React from 'react';

const PayrollDisplay = ({ payDetails }) => {
  const totalPay = payDetails.reduce((acc, day) => acc + day.pay, 0);

  return (
    <div>
      <h2>Payroll Details</h2>
      <ul>
        {payDetails.map((day, index) => (
          <li key={index}>
            {day.day}: {day.duration} hours - ${day.pay.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total Pay: ${totalPay.toFixed(2)}</h3>
    </div>
  );
};

export default PayrollDisplay;
