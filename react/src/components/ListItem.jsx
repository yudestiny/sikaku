import React from 'react';

const itemsData = [
  { id: 1, text: 'アイテム1' },
  { id: 2, text: 'アイテム2' },
  { id: 3, text: 'アイテム3' },
  { id: 4, text: 'アイテム4' },
  { id: 5, text: 'アイテム5' },
  { id: 6, text: 'アイテム6' },
  { id: 7, text: 'アイテム7' },
  { id: 8, text: 'アイテム8' },
  { id: 9, text: 'アイテム9' },
  { id: 10, text: 'アイテム10' },
  { id: 11, text: 'アイテム11' },
];

const TopPage = ({qualifications}) => (
  <div className="flex flex-wrap">
    {qualifications.slice(0, 3).map(item => (
      <div key={item.id} className="w-1/3 p-4 text-center">
        <div className="border border-solid border-black p-4 rounded-md">
          <div className="bg-blue-500 text-white font-bold mb-2 p-2 rounded-md">
            {item.id}
          </div>
          <div>{item.name}</div>
        </div>
      </div>
    ))}
    {qualifications.slice(3).map(item => (
      <div key={item.id} className="w-1/4 p-4">
        <div className="border border-solid border-black p-4 rounded-md">
          <div className="bg-blue-500 text-white font-bold mb-2 p-2 rounded-md">
            {item.id}
          </div>
          <div>{item.name}</div>
        </div>
      </div>
    ))}
  </div>
);

export default TopPage;
