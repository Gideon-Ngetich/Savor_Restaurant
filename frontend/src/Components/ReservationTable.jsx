import {React, useState} from 'react'
import {useSnackbar} from 'notistack'

const ReservationTable = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [people, setPeople] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const {enqueSnackbar} = useSnackbar();
  const link = 'https://savor-restaurant-1.onrender.com'
  // const backendURL = process.env.BACKEND_URL || 'https://promise-website.onrender.com'

  const handleBook = async () => {
    try {
      await axios.post(`${link}/api/reserve-table`, { name, email, phone, people, date, time })
      console.log('Reservation successful');
      enqueSnackbar('Reservation Successful', {variant: 'success'});
    } catch (err) {
      console.log(err);
      enqueSnackbar('Submission Failed', {variant: 'error'});
    }
  }

  return (
    <>
      <span className=''>
          <form className='flex flex-col w-full lg:grid gap-5 grid-cols-2' action="">
            <span className='flex flex-col'>
              <label className='text-white' htmlFor="name">Name</label>
              <input className='p-2 w-80' id='name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </span>

            <span className='flex flex-col'>
              <label className='text-white' htmlFor="">Date</label>
              <input className='p-2 w-80' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </span>

            <span className='flex flex-col'>
              <label className='text-white' htmlFor="">Email</label>
              <input className='p-2 w-80' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </span>


            <span className='flex flex-col'>
              <label className='text-white' htmlFor="">People</label>
              <input className='p-2 w-80' type="number" value={people} onChange={(e) => setPeople(e.target.value)} />
            </span>

            <span className='flex flex-col'>
              <label className='text-white' htmlFor="">Time</label>
              <input className='p-2 w-80' type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </span>

            <span className='flex flex-col'>
              <label className='text-white' htmlFor="">Phone</label>
              <input className='p-2 w-80' type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </span>

          </form>
          <span className='flex m-10 justify-center items-center'>
            <button onClick={handleBook} className='px-8 py-4 rounded-md text-white font-bold hover:bg-red-700 bg-red-600'>Book</button>
          </span>
        </span>
    </>
  )
}

export default ReservationTable