'use client';

import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<any[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return;

    let query = supabase
      .from('free_classes')
      .select('*')
      .or(`class_number.ilike.%${searchTerm}%,block.ilike.%${searchTerm}%,day.ilike.%${searchTerm}%,time.ilike.%${searchTerm}%`)

    // If the search term is a number, include it in the floor search
    if (!isNaN(Number(searchTerm))) {
      query = query.or(`floor.eq.${Number(searchTerm)}`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error searching classes:', error)
    } else {
      setResults(data || [])
    }
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by class number, block, day, floor, or time"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="college-button py-2 px-4 rounded">Search</button>
      </form>
      {results.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Search Results:</h3>
          <ul className="space-y-2">
            {results.map((result) => (
              <li key={result.id} className="bg-blue-100 p-2 rounded">
                Block: {result.block}, Floor: {result.floor}, Class: {result.class_number}, Time: {result.time}, Day: {result.day}
              </li>
            ))}
          </ul>
        </div>
      ) : searchTerm.trim() !== '' && (
        <p className="mt-4 text-center text-gray-600">No matching classes found</p>
      )}
    </div>
  )
}

export default SearchBar