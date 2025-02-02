import { clear } from '@testing-library/user-event/dist/clear';
import React, { useState, useEffect } from 'react';
import { IoMdAdd, IoMdClose } from "react-icons/io";

const InputForm = ({ setPayDetails, mode }) => {
  const [days, setDays] = useState([]);
  const [payRates, setPayRates] = useState({
    weekday: '',
    saturday: '',
    sunday: '',
  });

  // Load pay rates from localStorage on component mount
  useEffect(() => {
    const savedPayRates = localStorage.getItem('payRates');
    if (savedPayRates) {
      setPayRates(JSON.parse(savedPayRates));
    }
  
    try {
      const savedPayDetails = localStorage.getItem('payDetails');
      if (savedPayDetails) {
        const parsedDetails = JSON.parse(savedPayDetails);
        if (Array.isArray(parsedDetails)) {
          setPayDetails(parsedDetails);
        } else {
          console.error("Invalid payDetails format in localStorage");
          setPayDetails([]); // Reset if invalid
        }
      }
    } catch (error) {
      console.error("Error parsing payDetails:", error);
      setPayDetails([]); // Reset to avoid breaking the app
    }
  }, [setPayDetails]);

  const handleAddDay = () => {
    setDays([...days, { date: '', start: '', end: '' }]);
  };

  const handleRemoveDay = (index) => {
    const updatedDays = days.filter((_, i) => i !== index);
    setDays(updatedDays);
  };

  const handleDayChange = (index, field, value) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };

  const handleRateChange = (field, value) => {
    const newPayRates = { ...payRates, [field]: value };
    setPayRates(newPayRates);
    localStorage.setItem('payRates', JSON.stringify(newPayRates));
  };
 //clearPyroll function
  const clearPayroll = () => {
    setDays([]);
    setPayRates({ weekday: '', saturday: '', sunday: '' });
    setPayDetails([]);
    const confirmed = window.confirm('Are you sure you want to clear the payroll?');
    if (confirmed) {
      localStorage.removeItem('payDetails');
    }
  };

  const calculatePayroll = () => {
    const dayRates = {
      Monday: payRates.weekday || 0,
      Tuesday: payRates.weekday || 0,
      Wednesday: payRates.weekday || 0,
      Thursday: payRates.weekday || 0,
      Friday: payRates.weekday || 0,
      Saturday: payRates.saturday || 0,
      Sunday: payRates.sunday || 0,
    };

    const newPayroll = days.map(day => {
      const dateObj = new Date(day.date);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  
      const start = new Date(`${day.date}T${day.start}`);
      const end = new Date(`${day.date}T${day.end}`);
      const duration = (end - start) / 1000 / 60 / 60; // Convert milliseconds to hours
      const pay = duration * (dayRates[dayName] || 0);
  
      return { ...day, day: dayName, duration, pay };
    });

    // Save as a new payroll entry
    const previousPayrolls = JSON.parse(localStorage.getItem('payDetails')) || [];
    const updatedPayrolls = Array.isArray(previousPayrolls) ? [...previousPayrolls, newPayroll] : [newPayroll];

    setPayDetails(updatedPayrolls);
    localStorage.setItem('payDetails', JSON.stringify(updatedPayrolls));
};

  return (
    <div className={`p-6 max-w-4xl mx-auto ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-t-xl shadow-xl space-x-10 md:flex`}>
      <div className='md:w-1/2 md:px-4'>
        <div className='flex'>
          <h2 className="text-2xl font-bold">Enter Work Details</h2>
          <button
            className="flex bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-600"
            onClick={handleAddDay}
          >
            Add Day <IoMdAdd className='items-center text-center my-auto ml-1' />
          </button>
        </div>

        {days.map((day, index) => (
          <div key={index} className="space-y-2 relative">
            <input
              type="date"
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded"
              value={day.date}
              onChange={(e) => handleDayChange(index, 'date', e.target.value)}
            />
            <input
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={day.start}
              onChange={(e) => handleDayChange(index, 'start', e.target.value)}
            />
            <input
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={day.end}
              onChange={(e) => handleDayChange(index, 'end', e.target.value)}
            />
            <button
              className="absolute top-3.5 text-red-500"
              onClick={() => handleRemoveDay(index)}
            >
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>

      <div className='md:w-1/2 mt-0'>
        <h2 className="text-2xl font-bold">Enter Pay Rates</h2>
        <input
          type="number"
          placeholder="Weekday Rate"
          className="w-full px-3 my-2 py-2 border border-gray-300 rounded"
          value={payRates.weekday}
          onChange={(e) => handleRateChange('weekday', e.target.value)}
        />
        <input
          type="number"
          placeholder="Saturday Rate"
          className="w-full px-3 my-2 py-2 border border-gray-300 rounded"
          value={payRates.saturday}
          onChange={(e) => handleRateChange('saturday', e.target.value)}
        />
        <input
          type="number"
          placeholder="Sunday Rate"
          className="w-full px-3 my-2 py-2 border border-gray-300 rounded"
          value={payRates.sunday}
          onChange={(e) => handleRateChange('sunday', e.target.value)}
        />
        <button
          className="float-right bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600"
          onClick={calculatePayroll}
        >
          Calculate Payroll
        </button>
        <button
          className="float-left bg-red-500 text-white px-4 py-2 mt-2 rounded"
          onClick={clearPayroll}
        >
          Clear Payroll
        </button>
      </div>
    </div>
  );
};

export default InputForm;
