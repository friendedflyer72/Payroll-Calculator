import React, { useState } from 'react';

const InputForm = ({ setPayDetails, mode }) => {
  const [days, setDays] = useState([]);
  const [payRates, setPayRates] = useState({
    weekday: '',
    saturday: '',
    sunday: '',
  });

  const handleAddDay = () => {
    setDays([...days, { day: '', start: '', end: '' }]);
  };

  const handleDayChange = (index, field, value) => {
    const newDays = [...days];
    newDays[index][field] = value;
    setDays(newDays);
  };

  const handleRateChange = (field, value) => {
    setPayRates({ ...payRates, [field]: value });
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
      const start = new Date(`01/01/2021 ${day.start}`);
      const end = new Date(`01/01/2021 ${day.end}`);
      const duration = (end - start) / 1000 / 60 / 60; // duration in hours
      const pay = duration * dayRates[day.day];
      return { ...day, duration, pay };
    });

    setPayDetails(calculatedDetails);
  };

  return (
    <div className={`p-6 max-w-lg mx-auto ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'} rounded-t-xl shadow-xl space-y-4`}>
      <h2 className="text-2xl font-bold">Enter Work Details</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleAddDay}
      >
        Add Day
      </button>
      {days.map((day, index) => (
        <div key={index} className="space-y-2">
          <input
            type="text"
            placeholder="Day (e.g., Monday)"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            value={day.day}
            onChange={(e) => handleDayChange(index, 'day', e.target.value)}
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
      <h2 className="text-2xl font-bold">Enter Pay Rates</h2>
      <input
        type="number"
        placeholder="Weekday Rate"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        value={payRates.weekday}
        onChange={(e) => handleRateChange('weekday', e.target.value)}
      />
      <input
        type="number"
        placeholder="Saturday Rate"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        value={payRates.saturday}
        onChange={(e) => handleRateChange('saturday', e.target.value)}
      />
      <input
        type="number"
        placeholder="Sunday Rate"
        className="w-full px-3 py-2 border border-gray-300 rounded"
        value={payRates.sunday}
        onChange={(e) => handleRateChange('sunday', e.target.value)}
      />
      <button
        className="float-right bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        onClick={calculatePayroll}
      >
        Calculate Payroll
      </button>
    </div>
  );
};

export default InputForm;
