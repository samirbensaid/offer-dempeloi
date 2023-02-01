import React, { startTransition, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { OfferContext } from '../context/OfferContext';
import { FormLabel } from '@mui/material';
import { Box } from '@mui/system';

export default function Search() {
  const [data, setData] = useContext(OfferContext)

  const initialOfferList = useMemo(() => data, [])

  console.log('initial', initialOfferList);

  const createFilter = useCallback((name) => {
    return [...new Set(initialOfferList.map((offer) => offer[name]))]
  })

  const [inputs, setInputs] = useState({})


  const cities = createFilter('city')

  const experience = createFilter('experience_code')




  //   const onSubmit = (e) => {
  //     e.preventDefault()
  //     const formData = new FormData(e.target)
  //     console.log(formData);
  //     console.log('obj',Object.fromEntries([...formData.entries()]));
  //     const inputData = Object.fromEntries([...formData.entries()].filter(([,v]) => Boolean(v.trim())))
  // console.log('inpData',inputData);

  // const newData = initialOfferList.filter((offer) => (
  //   Object.entries(inputData).every(([k,v]) => {
  //     return k ==='title'
  //     ?offer[k].toLowerCase().includes(v.toLowerCase())
  //     :offer[k]===v
  //   })
  // ))
  // setData(newData)

  //   }



  /******************** real time **********************/

  console.log('inputs', Object.entries(inputs));

  const filtredData = Object.entries(inputs).filter(([, v]) => !!(v.trim()))
  useEffect(() => {
    const newData = initialOfferList.filter((offer) => (
      filtredData.every(([k, v]) => {
        return k === 'title'
          ? offer[k].toLowerCase().includes(v.toLowerCase())
          : offer[k] === v
      })
    ))
    startTransition(() => {
      setData(newData)
    })

  }, [inputs])






  return (
    <div className='lg:p-20 lg:w-[60%] bg-[#36383d] lg:order-last sm:order-first sm:w-full'>
      <h2 className='font-semibold text-xl'>SEARCH</h2>
      <form>

          <Box className='text-center'>
        <TextField id="outlined-basic" label="enter title" variant="outlined" name='title' onChange={(e) => setInputs({ ...inputs, title: e.target.value })}/>
        </Box>




        <Box className='border-t-[1px] p-4 mt-5 text-center'>
          <FormLabel class='location'>Location</FormLabel>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name='city' onChange={(e) => setInputs({ ...inputs, city: e.target.value })}>
            <FormControlLabel value="" control={<Radio />} label="All" className='mt-[15%] py-4' />
            {cities.map((el, i) => (
              <FormControlLabel value={el} control={<Radio />} label={el} className='mt-[15%] py-4' name="city" key={i} />
            ))
            }
          </RadioGroup>
        </Box>


        <Box className='border-t-[1px] p-4 mt-5 text-center'>
          <FormLabel class='location'>Experience Code</FormLabel>
          <RadioGroup aria-labelledby="demo-radio-buttons-group-label">
            {experience.map((el, i) => (
              <FormControlLabel value={el} control={<Radio />} label={el} className='mt-[15%] py-4
              ' name="experience_code" key={i} onChange={(e) => setInputs({ ...inputs, experience_code: e.target.value })} />
            ))
            }
          </RadioGroup>
        </Box>

        <button className='bg-orange-600 px-3 py-2 mt-4 table mx-auto'>Submit</button>

      </form>

    </div>
  )
}
