import React from 'react';
import {Money} from '@shopify/hydrogen';
import {useEffect, useState} from 'react';

const ShippingBar = ({totalAmount}) => {
  const minimumSpend = 20;
  const [amountAway, setAmountAway] = useState(minimumSpend);
  const totalSpend = totalAmount;
  const [remainingPorcent , setRemainginporcent]= useState(10)

  useEffect(() => {
    setAmountAway(Number(minimumSpend) - Number(totalSpend.amount));
  }, [totalSpend]);

  useEffect(()=>{
 console.log(amountAway) 
  },[amountAway])

  return (
    <div className="flex flex-col space-y-2 bg-gray-100 p-4 rounded-md shadow-sm">
      <h1 className="text-lg font-medium text-slate-950 text-center">
        Summary
      </h1>
      <div className="flex flex-row justify-between items-center bg-green-100 p-2 rounded">
        <span className="text-sm font-medium text-green-700">
          You have free standard shipping
        </span>
      </div>
      <div className="flex flex-row justify-between items-center bg-blue-100 ">
        <p className="text-sm font-medium text-violet-700">
          You are in:{' '}
          <Money data={{amount : amountAway.toString(), currencyCode:totalAmount.currencyCode}} />
        </p>
      </div>

      <div className="flex flex-row justify-between items-center bg-red-100 p-2 rounded">
        <span className="text-sm font-medium text-red-700">
          {' '}
          to obtain express shipping{' '}
        </span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-2.5 dark-bg-gray-700'>
         <div className='bg-blue-600 h-2.5 rounded-full' style = {{width: `${remainingPorcent}%`}}></div>
      </div>
    </div>
  );
};

export default ShippingBar;
