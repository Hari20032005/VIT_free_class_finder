'use client';
import React, { useState } from 'react';
import AddClass from '@/components/AddClass';
import { Search, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

const title = 'Free Class Finder';

const data = [
  { time: '10:00 AM', day: 'Monday', block: 'A', floor: 1, roomNo: 101 },
  { time: '11:30 AM', day: 'Tuesday', block: 'B', floor: 2, roomNo: 205 },
  { time: '2:00 PM', day: 'Wednesday', block: 'C', floor: 3, roomNo: 310 },
  { time: '3:30 PM', day: 'Thursday', block: 'D', floor: 4, roomNo: 402 },
  { time: '5:00 PM', day: 'Friday', block: 'E', floor: 5, roomNo: 515 },
];

const FreeClass = ({ onClose }:{onClose: () => void}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Class</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <AddClass />
      </div>
    </div>
  );
};

const AdvancedSearchAndTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFreeClass, setShowFreeClass] = useState(false);

  const handleSort = (column:any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a:any, b:any) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4 sm:p-8 bg-gray-100 min-h-screen relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">{title}</h1>
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex items-center bg-gray-100 rounded-full p-2 mb-6">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by any column"
              className="ml-2 flex-1 bg-transparent outline-none text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Desktop View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-black text-white">
                  {Object.keys(data[0]).map((column) => (
                    <th
                      key={column}
                      className="py-3 px-4 text-left cursor-pointer"
                      onClick={() => handleSort(column)}
                    >
                      <div className="flex items-center">
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                        {sortColumn === column && (
                          sortDirection === 'asc' ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    {Object.values(item).map((value, valueIndex) => (
                      <td key={valueIndex} className="py-3 px-4 border-b">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile View */}
          <div className="sm:hidden">
            {sortedData.map((item, index) => (
              <div key={index} className="mb-4 bg-white rounded-lg shadow p-4">
                {Object.entries(item).map(([key, value], entryIndex) => (
                  <div key={entryIndex} className="flex justify-between py-2 border-b last:border-b-0">
                    <span className="font-semibold text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {sortedData.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No results found</p>
          )}
        </div>
      </div>

      {/* Plus button */}
      <button
  className="fixed bottom-6 right-6 bg-black text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors
    mobile:bottom-[2vh] mobile:right-[2vh] mobile:mb-0 mobile:mr-0"
  onClick={() => setShowFreeClass(true)}
>
  <Plus className="w-6 h-6" />
</button>


      {/* FreeClass overlay */}
      {showFreeClass && <FreeClass onClose={() => setShowFreeClass(false)} />}
    </div>
  );
};

export default AdvancedSearchAndTable;