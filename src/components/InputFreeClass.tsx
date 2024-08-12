'use client';

import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const InputFreeClass = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [block, setBlock] = useState('')
  const [floor, setFloor] = useState('')
  const [classNumber, setClassNumber] = useState('')
  const [time, setTime] = useState('')
  const [day, setDay] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('free_classes')
      .insert([{ block, floor: parseInt(floor), class_number: classNumber, time, day }])

    if (error) {
      console.error('Error inserting free class:', error)
    } else {
      alert('Free class added successfully!')
      setBlock('')
      setFloor('')
      setClassNumber('')
      setTime('')
      setDay('')
      setIsFormOpen(false)
    }
  }

  return (
    <div className="college-card p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Input Free Class</h2>
      {!isFormOpen ? (
        <button 
          onClick={() => setIsFormOpen(true)} 
          className="college-button w-full py-2 px-4 rounded"
        >
          Add Free Class
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <select 
              value={block} 
              onChange={(e) => setBlock(e.target.value)} 
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Block</option>
              <option value="sjt">SJT</option>
              <option value="prp">PRP</option>
              <option value="tt">TT</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              min="0"
              max="8"
              required
              placeholder="Floor (0-8)"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <input
              type="text"
              value={classNumber}
              onChange={(e) => setClassNumber(e.target.value)}
              required
              placeholder="Class Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              min="08:00"
              max="19:00"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <select 
              value={day} 
              onChange={(e) => setDay(e.target.value)} 
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
            </select>
          </div>
          <button type="submit" className="college-button w-full py-2 px-4 rounded">Submit</button>
          <button 
            type="button" 
            onClick={() => setIsFormOpen(false)} 
            className="w-full py-2 px-4 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  )
}

export default InputFreeClass