import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import './teacher.sass';
export default function Manage(){
const [data,setData]=useState([]);
const navigate=useNavigate();
function fetchuser()
{
  fetch("http://127.0.0.1:8000/api/users")
  .then((res) =>
      res.json())

  .then((data) => {
      //console.log(data);
      setData(data);
     console.log(data.book.title);
  },)
}
useEffect( ()=>{
   fetchuser();
},[])
async function deleteHandler(id){
  
 await fetch("http://localhost:8000/api/users/delete/"+id,{method:'DELETE'});
 Swal.fire({
  position: 'top-end',
  icon: 'error',
  title: 'Student is deleted',
  showConfirmButton: false,
  timer: 1500
})
  fetchuser();
  }

const updateHandler=(id)=>{
  localStorage.setItem('sid',id);
  navigate('update');
}

const addHandler=()=>{
  navigate('/student/signup');
}
    return (
    <>

<div className="container">
<div className='container' >
<span style={{marginTop:'60px',marginLeft:'400px',font:'60px bold sans-serif ',color:"yellowgreen"}}  >STUDENTS</span>
    <button className='btn btn-primary' onClick={(e)=>addHandler(e)}  style={{ marginTop:'30px',marginLeft:'900px'}}>
      Add new 
    </button>
  </div>
<table className="table table-hover m-md-5">
  <thead >
    <tr >
    
      <th scope="col">Name</th>
      <th scope="col">Contact No</th>
      <th scope="col">Email</th>
      
      <th scope="col" >Action</th>
    </tr>
  </thead>
  {data&&data.map(user=>(
    <tbody key={user.id}>
    <tr>
  
    <th scope="col"><img  src={`http://localhost:8000/${user.file_path}`} className="rounded-circle" alt="image not found" height={50} width={70}/>
        &emsp;  
      {user.name}</th>
      <td>{user.contact_no}</td>
      <td>{user.email}</td>
      <td>
      <button className='btn btn-info' onClick={(e)=>updateHandler(user.id)}>Update</button> &emsp;
        <button className='btn btn-danger' onClick={(e)=>deleteHandler(user.id)}>Remove</button>
      </td>
     
    </tr>
    
  </tbody>
  ))}
  
</table>

</div>

        </>
    )
}