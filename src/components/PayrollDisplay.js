import React from 'react';

const PayrollDisplay = ({ payDetails, mode }) => {
  if (!Array.isArray(payDetails)) {
    return <div className="text-red-500">Error: Payroll data is not in the correct format.</div>;
  }

  return (
    <div className={`p-6 max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-b-xl shadow-md space-y-4`}>
      <h2 className='text-2xl font-bold'>Payroll Details</h2>
      {payDetails.map((payroll, index) => {
        if (!Array.isArray(payroll)) return <p className="text-red-500">Error: Invalid payroll data.</p>;

        const totalPay = payroll.reduce((acc, day) => acc + (day.pay || 0), 0);

        return (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Payroll {index + 1}</h3>
            <ul>
              {payroll.map((day, i) => (
                <li key={i}>
                  {day.date} ({day.day}): {day.duration.toFixed(2)} hours - ${day.pay.toFixed(2)}
                </li>
              ))}
            </ul>
            <h3 className="mt-2 font-semibold">Total Pay: ${totalPay.toFixed(2)}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default PayrollDisplay;
