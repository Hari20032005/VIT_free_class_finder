'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const AddClass = () => {
  const [formData, setFormData] = useState({
    block: '',
    floor: '',
    classNumber: '',
    day: '',
    time: '',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', message: '' });

    try {
      const { data, error } = await supabase
        .from('free_classes')
        .insert([{ 
          block: formData.block, 
          floor: parseInt(formData.floor), 
          class_number: formData.classNumber, 
          day: formData.day,
          time: formData.time 
        }]);

      if (error) throw error;

      setAlert({ type: 'success', message: 'Free class added successfully!' });
      setFormData({ block: '', floor: '', classNumber: '', day: '', time: '' });
    } catch (error) {
      console.error('Error inserting free class:', error);
      setAlert({ type: 'error', message: 'Failed to add free class. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(time);
      }
    }
    return times;
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="-space-y-px">
          <div>
            <label htmlFor="block" className="sr-only">Block</label>
            <select 
              id="block"
              name="block"
              value={formData.block} 
              onChange={handleChange} 
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="">Select Block</option>
              <option value="sjt">SJT</option>
              <option value="prp">PRP</option>
              <option value="tt">TT</option>
            </select>
          </div>
          <div>
            <label htmlFor="floor" className="sr-only">Floor</label>
            <input
              id="floor"
              name="floor"
              type="number"
              value={formData.floor}
              onChange={handleChange}
              min="0"
              max="8"
              required
              placeholder="Floor (0-8)"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="classNumber" className="sr-only">Class Number</label>
            <input
              id="classNumber"
              name="classNumber"
              type="text"
              value={formData.classNumber}
              onChange={handleChange}
              required
              placeholder="Class Number"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="day" className="sr-only">Day</label>
            <select 
              id="day"
              name="day"
              value={formData.day} 
              onChange={handleChange} 
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="">Select Day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label htmlFor="time" className="sr-only">Time</label>
            <select 
              id="time"
              name="time"
              value={formData.time} 
              onChange={handleChange} 
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="">Select Time</option>
              {generateTimeOptions().map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full">
            Add Class
          </Button>
        </div>
      </form>

      {alert.type && (
        <Alert variant={alert.type === 'success' ? 'default' : 'destructive'}>
          {alert.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AddClass;