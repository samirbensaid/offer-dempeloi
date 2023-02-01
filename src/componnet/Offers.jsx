import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Search from './Search';
import Offer from './offer';
import { OfferContext } from '../context/OfferContext';
import SearchWithHook from './SearchWithHook';
import { Alert, Box } from '@mui/material';

export default function Offers() {


const [reset,setReset]=useState([])

    const [data,setData]=useState(null)


    useEffect(()=>{
        async function fetchOffer(){
           axios.get("https://globaljetluxembourg.recruitee.com/api/offers").then((res)=>{
                 console.log(res);
                setData(res.data.offers)
                setReset(res.data.offers)
            })
        }fetchOffer()
    },[]);
console.log('data',data);




if (!data) return null
 
  

  return (
    <OfferContext.Provider value={[data,setData]}>
     <div className='lg:grid lg:grid-cols-2 lg:gap-4 p-4 sm:grid sm:grid-cols-1'>
     <ul>
      <h2 className='font-semibold text-xl'>JOBS</h2>
      {
        data.map((elem,i)=>{
          return(
            <li key={i}>
              <Offer item={elem}/>
            </li>
          )
        })
      }

{data.length === 0 && <Box>
  <Alert severity="info">No Results — check it out!</Alert>
 <button className='bg-red-500 px-3 py-2 table mx-auto' onClick={()=>setData(reset)}>Reset</button>
 </Box>}
     </ul>
     
  
    {/*<Search/>*/}

      <SearchWithHook/>
     


        
   

    </div>
    </OfferContext.Provider>
    )
  
  
}
