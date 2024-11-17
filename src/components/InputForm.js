import React, { useState, useEffect } from 'react';
import { IoMdAdd } from "react-icons/io";

const InputForm = ({ setPayDetails, mode }) => {
  const [days, setDays] = useState([]);
  const [payRates, setPayRates] = useState({
    weekday: '',
    saturday: '',
    sunday: '',
  });

  // Load pay rates and pay details from localStorage on component mount
  useEffect(() => {
    const savedPayRates = localStorage.getItem('payRates');
    if (savedPayRates) {
      setPayRates(JSON.parse(savedPayRates));
    }

    const savedPayDetails = localStorage.getItem('payDetails');
    if (savedPayDetails) {
      setPayDetails(JSON.parse(savedPayDetails));
    }
  }, [setPayDetails]);

  const handleAddDay = () => {
    setDays([...days, { date: '', start: '', end: '' }]);
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

  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long' };
    return date.toLocaleDateString('en-US', options); // Get day name (e.g., Monday)
  };

  const calculatePayroll = () => {
    const dayRates = {
      Monday: payRates.weekday,
      Tuesday: payRates.weekday,
      Wednesday: payRates.weekday,
      Thursday: payRates.weekday,
      Friday: payRates.weekday,
      Saturday: payRates.saturday,
      Sunday: payRates.sunday,
    };

    const calculatedDetails = days.map(day => {
      const dayName = getDayFromDate(day.date); // Get day name
      const start = new Date(`01/01/2021 ${day.start}`);
      const end = new Date(`01/01/2021 ${day.end}`);
      const duration = (end - start) / 1000 / 60 / 60; // duration in hours
      const pay = duration * dayRates[dayName];

      // Include date and day as unique identifiers
      return { date: day.date, day: dayName, start: day.start, end: day.end, duration, pay };
    });

    // Combine new calculated details with any existing ones, preserving unique entries
    const savedPayDetails = JSON.parse(localStorage.getItem('payDetails')) || [];
    const mergedDetails = [...savedPayDetails, ...calculatedDetails];

    setPayDetails(mergedDetails);
    localStorage.setItem('payDetails', JSON.stringify(mergedDetails));
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
            Add Day<IoMdAdd className='items-center text-center my-auto ml-1' />
          </button>
        </div>
        {days.map((day, index) => (
          <div key={index} className="space-y-2">
            <input
              type="date"
              placeholder="Date"
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded"
              value={day.date}
              onChange={(e) => handleDayChange(index, 'date', e.target.value)}
            />
            <input
              type="time"
              placeholder="Start Time"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={day.start}
              onChange={(e) => handleDayChange(index, 'start', e.target.value)}
            />
            <input
              type="time"
              placeholder="End Time"
              className="w-full px-3 py-2 border border-gray-300 rounded"
              value={day.end}
              onChange={(e) => handleDayChange(index, 'end', e.target.value)}
            />
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
      </div>
    </div>
  );
};

export default InputForm;