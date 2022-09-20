import React, { Fragment, useEffect, useRef } from 'react'

import ReactDOM from 'react-dom'










export default function Modal({open, setOpen, item}) {
    const ref=useRef(null)
    const handleClose = () => setOpen(!open);

    
        
        useEffect(()=>{
            const handleClickOutside=(event)=>{
                console.log("ref",ref.current);
                console.log('contain',ref.current.contains(event.target));
                if(ref.current.contains(event.target) === true){
                    setOpen(false)
                   console.log('samir')
                }
                
            }
            document.addEventListener("click",handleClickOutside,true)
            return ()=>{
                document.removeEventListener("click",handleClickOutside)
            }
        
        },[ref])

    
console.log("open",open);
     //document.documentElement.style.overflow = "hidden"

    // document.documentElement.style.overflow = null


    //const root = document.getElementById('root')

    //root.addEventListener('click',handleClose)

if(!open) return null 
    return (

        <Fragment className='overlay'>

            {
                ReactDOM.createPortal(
                    <div className='content' ref={ref} >
                        <button onClick={()=>handleClose()} className='float-right bg-red-600 hover:bg-red-300 text-white font-bold py-1 px-2 rounded-full '>X</button>
                        <h1 className='font-bold text-lime-500'>{item.title}</h1>
                        <p>{item.city} | {item.employment_type_code}</p>
                        <p>{item.translations.en.sharing_description}</p>
                         <button onClick={() => handleClose()}className='bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-full mt-2'>close</button>
                         
                    </div>,
                    document.body
                )
            }
        </Fragment>

        

    )
}

