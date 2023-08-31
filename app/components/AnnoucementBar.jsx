import React, { useState, useEffect, useRef } from 'react';

const CustomAnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 50, hours: 0, minutes: 0, seconds: 0 });
  const refAnnouncemntText = useRef(null);
  useEffect(() => {
    setIsVisible(true);

    const calculateTimeLeft = () => {
      const futureDate = new Date("Nov 2, 2023 23:59:59");
      futureDate.setDate(futureDate.getDate() + 50);
      const now = new Date();
      const difference = futureDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, []);

  

  return (
 <div className=' bg-white shadow-md'>
      <div className='container mx-auto p-4'>
        <div className={`flex justify-between items-center ${isVisible ? 'text-gray-800' : 'text-gray-600'}`}>
          
          <div className='flex flex-col'>
            <div className='text-sm font-semibold' ref={refAnnouncemntText}>
              ¡Sumérgete en la aventura con nuestras tablas de snowboard con descuento!
            </div>
            <div className='text-xs'>
              COMPRA 2 ELÉCTRICOS, OBTÉN UN 20% DE DESCUENTO
            </div>
          </div>
          
          <div className='ml-4 text-xs font-medium'>
            {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAnnouncementBar;
