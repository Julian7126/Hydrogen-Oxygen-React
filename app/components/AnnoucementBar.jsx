import { useState, useEffect } from 'react';
const CustomAnnouncementBar = ({ extractedDate }) => {
  const [countDays, setCountDays] = useState("");
  const [countHours, setCountHours] = useState("");
  const [countMinutes, setCountMinutes] = useState("");
  const [countSeconds, setCountSeconds] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (extractedDate) {
      const intervalId = setInterval(() => {
        const countDownDate = new Date(extractedDate).getTime();
        const now = new Date().getTime();
        const timeLeft = countDownDate - now;

        setCountDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
        setCountHours(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setCountMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)));
        setCountSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [extractedDate]);

  return (
    <div className='bg-white shadow-md'>
      <div className='container mx-auto p-4'>
        <div className={`flex justify-between items-center ${isVisible ? 'text-gray-800' : 'text-gray-600'}`}>
          <div className='flex flex-col'>
            <div className='text-sm font-semibold'>
              ¡Sumérgete en la aventura con nuestras tablas de snowboard con descuento!
            </div>
            <div className='text-xs'>
              COMPRA 2 ELÉCTRICOS, OBTÉN UN 20% DE DESCUENTO
            </div>
          </div>
          <div className='ml-4 text-xs font-medium'>
            {`${countDays}d ${countHours}h ${countMinutes}m ${countSeconds}s`}
          </div>
        </div>
      </div>
    </div>
  );
};


export default CustomAnnouncementBar;