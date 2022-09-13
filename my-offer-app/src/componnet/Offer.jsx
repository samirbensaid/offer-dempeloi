
import React, { useState } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function Offer(props) {

  dayjs.extend(relativeTime)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {

    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'bg-[#36383d]',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className='border-t-2 py-6'>

      <h3 className='py-4 text-2xl'> {props.item.title}</h3>
      <div className='grid grid-cols-4 gap-4'>
        <p>{props.item.company_name}</p>
        <p><i className="fa-sharp fa-solid fa-location-dot"></i> {props.item.city}</p>
        <p><i className="fa-solid fa-clock"></i> {props.item.employment_type_code}</p>
        <p><i className="fa-solid fa-calendar"></i> {dayjs(props.item.published_at).fromNow()}</p>
      </div>
      <button onClick={handleOpen} className='text-orange-300 py-2'><i className="fa-sharp fa-solid fa-circle-arrow-right "></i>  MORE DETAILS</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.item.title}
            
          </Typography>
          <p>{props.item.city + " " + "|" + " " + props.item.employment_type_code}</p>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.item.translations.en.description}
          </Typography>
        </Box>
      </Modal>


    </div>
  )
}
