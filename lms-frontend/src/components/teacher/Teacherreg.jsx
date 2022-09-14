import "../index.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
import Swal from "sweetalert2";
export default function Teacherreg()
{
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const[file,setFile]=useState('');
  const[error,setError]=useState([]);
  const[emailerror,setEmailError]=useState('');
  const navigate=useNavigate();
  const[fileerr,setFileerr]=useState('');
  function checkMail()
  {
    let regEmail =/^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
    if(!email)
    {
      setEmailError("The email field is required")
    } 
   else  if(!regEmail.test(email)){
        setEmailError('Invalid Email address')
      }
  }
  function checkImage()
  {
   if(!file)
   {
    setFileerr("The image field is required");
   }
    else if ( !(/\.(jpe?g)$/i.test(file.name)) ) {
      setFileerr("Invalid Image type!!upload jpg and jpeg only");
  }
  }
async function signUpHandler(e)
{
  e.preventDefault();
  checkImage();
  const formdata= new FormData();
formdata.append('name',name);
formdata.append('email',email);
formdata.append('password',password);
formdata.append('file_path',file);
//formdata.append('image',file);
//console.log(formdata);
let result=await fetch("http://localhost:8000/api/register/admin",{
    method:'POST',
  body:formdata}
  )
  let err=await result.json();
 // console.warn("error",err.validate_err);
  if(result.status===201)
  {
    localStorage.setItem('teacher-info',JSON.stringify(err));
    navigate('/manage/students');
    
  }
  else
  {
    setError(err.validate_err);
    setEmailError(err.validate_err.email);
    setFileerr(err.validate_err.file_path);
    checkImage();
    checkMail();
    
  }
}
    return(
      <>
        <div className="container-fluid" >
            <div className="row d-flex justify-content-center flex-column min-vh-100 align-items-center d-grid gap-3">
            <div  className="col-md-4 border border-3 mx-auto p-2 bg-light border " >
                    <div className="container">
                    <form>
        <h3>Teacher Signup</h3>
        <div className="mb-3">
          <label>Name</label>
          <span className="text-danger"><sup>*</sup></span>
          <span className="text-danger m-2">{error.name}</span>
          <input
            type="text"
            className="form-control"
            placeholder="User name"
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        
        <div className="mb-3">
          <label>Email address</label>
          <span className="text-danger"><sup>*</sup></span> &emsp;
          <span  className=" m-2 text-danger">{emailerror}</span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e)=>setEmail(e.target.value)}
            
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <span className="text-danger"><sup>*</sup></span> &emsp;
          <span className=" m-2 text-danger">{error.password}</span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Upload Image</label>
          <span className=" m-2 text-danger">{fileerr}</span>
          <input className="form-control form-control-sm" id="formFileSm" type="file"
          onChange={(e)=>setFile(e.target.files[0])}
          
          />
        </div>
       
        <div className="d-grid">
          <button type="submit" onClick={(e)=>signUpHandler(e)}  className="btn btn-primary">
            Signup
          </button>
        </div>
        <center><p >
         Already Registered ? <a style={{textDecoration:'none'}} href="/teacher/login">Sign in</a>
        </p>
</center>  
      </form>
        </div>
        </div>
          </div>            
       </div> 
         </>
    )
}