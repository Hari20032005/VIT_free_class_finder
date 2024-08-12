'use client';

import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const FindFreeClass = () => {
  const [block, setBlock] = useState('')
  const [floor, setFloor] = useState('')
  const [time, setTime] = useState('')
  const [day, setDay] = useState('')
  const [results, setResults] = useState<any[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('free_classes')
      .select('*')
      .eq('block', block)
      .eq('floor', parseInt(floor))
      .eq('time', time)
      .eq('day', day)

    if (error) {
      console.error('Error fetching free classes:', error)
    } else {
      setResults(data || [])
    }
  }

  return (
    <div className="college-card p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Find Free Class</h2>
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
        <button type="submit" className="college-button w-full py-2 px-4 rounded">Find</button>
      </form>
      {results.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {results.map((result) => (
            <li key={result.id} className="bg-blue-100 p-2 rounded">
              Block: {result.block}, Floor: {result.floor}, Class: {result.class_number}, Time: {result.time}, Day: {result.day}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-center text-gray-600">No class available</p>
      )}
    </div>
  )
}

export default FindFreeClass