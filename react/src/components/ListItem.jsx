import { Typography } from '@material-tailwind/react';
import React from 'react';


const TopPage = ({qualifications}) => (
  <>
  <div>
    <Typography>人気資格ランキング</Typography>
  </div>
  <div className="flex flex-wrap">
    {qualifications.slice(0,3).map(item => (
      <div key={item.id} className="w-1/3 p-4 text-center">
        <div className="border border-solid border-black p-4 rounded-md">
          <div className="bg-blue-500 text-white font-bold mb-2 p-2 rounded-md">
            {item.count}
          </div>
          <div>{item.name}</div>
        </div>
      </div>
    ))}
  </div>
  <div className="grid grid-cols-6 flex-wrap">
    {qualifications.slice(3).map(item => (
      <div key={item.id} className="col-span-1 p-4 text-center">
        <div className="border border-solid border-black p-4 rounded-md">
          <div className="bg-blue-500 text-white font-bold mb-2 p-2 rounded-md">
            {item.count}
          </div>
          <div>{item.name}</div>
        </div>
      </div>
    ))}
  </div>
  </>
);

export default TopPage;
