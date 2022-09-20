import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import TextField from '@mui/material/TextField';
import { OfferContext } from '../context/OfferContext';
import { Button, FormLabel, Slide, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';






export default function SearchWithHook() {



    const isMd=useMediaQuery("(min-widh:1024px)")

    const[show,setShow]=useState(true)

    const handleChange=()=>{
        setShow((prev)=>!prev);
    };


    useEffect(()=>{
        if(!isMd){
            setShow(false)
        }
    },[isMd])



    const [data, setData] = useContext(OfferContext)

    const initialOfferList = useMemo(() => data, [])

    const { register, watch} = useForm()

    console.log('watch',watch());

    const createFilter = useCallback((name) => {
        return [...new Set(initialOfferList.map((offer) => offer[name]))]
    })


    const cities = createFilter('city')

    const experience = createFilter('experience_code')


    useEffect(() => {
        const subscription = watch((data1) => {
            const inputData = Object.entries(data1).filter(([,v]) => v === null 
            ? !!(v)
            : !!(v.trim())
            )
            
            
            const newData = initialOfferList.filter((offer) => (
              inputData.every(([k,v]) => {
                return k ==='title'
                ?offer[k].toLowerCase().includes(v.toLowerCase())
                :offer[k]===v
              })
            ))
            setData(newData)

        })
        return () => subscription.unsubscribe();
    },[watch])

    return (
        <div className='lg:p-20 lg:w-[60%] bg-[#36383d] lg:order-last sm:order-first sm:w-full'>
            <h2 className='font-semibold text-xl'>SEARCH</h2>

            {!isMd && <button onClick={handleChange} className='location'>Handle</button>}


            <Slide direction='up' in={show} unmountOnExit>
            <form>
            <Box className='text-center'>
                <TextField id="outlined-basic" label="enter title" variant="outlined" {...register('title')}
                sx={{
                    "& input,& label":{
                    color:"#fff",
                },
                "& fieldset":{
                    borderColor:"#bd9973"
                },
                }} />
                </Box>
                <Box className='border-t-[1px] p-4 mt-5 text-center'>
                    <FormLabel id='location0'>Location</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label"  >
                    <FormControlLabel value="" control={<Radio />} label="All" className='mt-[15%] py-4' />
                        {cities.map((el, i) => (
                            <FormControlLabel value={el} control={<Radio />} label={el} className='mt-[15%] py-4' {...register('city')} key={i} />
                        ))
                        }
                    </RadioGroup>
                </Box>
                <Box className='border-t-[1px] p-4 mt-5 text-center'>
                    <FormLabel id='location1'>Experience Code</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
                        {experience.map((el, i) => (
                            <FormControlLabel value={el} control={<Radio />} label={el} className='mt-[15%] py-4
                            ' {...register('experience_code')} key={i} />
                        ))
                        }
                    </RadioGroup>
                </Box>
            <button className='bg-orange-600 px-3 py-2 mt-4'>Submit</button>
            </form>
        </Slide>
        </div>
    )
}
