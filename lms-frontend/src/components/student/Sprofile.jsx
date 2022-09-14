import React, { useState, useEffect } from 'react';
import Show from './Mybooks';

export default function Profile()
{
    
  
  var user=JSON.parse(localStorage.getItem('student-info'));

  const [data,setData]=useState(user);
  console.log(data);
    return(
        <div className=" container-break-point ">
        <div className="row">
        <div className="col-9">
          {<Show/> }
        </div>
       
      <div className="col-3 animated fadeIn  " >
      
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card py-4 "  style={{marginTop:'60px',padding:'30px'}}>

           <div className="d-flex   h-100 justify-content-center align-items-center">
             <div className="round-image">
               <img src={`http://localhost:8000/${data.file_path}`} className="rounded-circle" width="97"/>
             </div>
           </div>

           <div className="text-center">

             <h4 className="mt-3">{data.name}</h4>
             <span className='text-muted' >{data.email}</span>

             <div className="px-5">
               <p className="content text-muted">{data.contact_no}</p>

               
             </div>
           </div>
          
        </div>
         </div>

             </div>
              
            </div>
          </div>
        
        
    
        
        
     

        
    )
}