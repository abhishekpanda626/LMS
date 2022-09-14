import "../index.css";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../Header";
import Swal from "sweetalert2";
export default function Studentreg()
{
  const [email,setEmail]=useState('');
  const [name,setName]=useState('');
  const [contact,setContact]=useState('');
  const [password,setPassword]=useState('');
  const[file,setFile]=useState('');
  const[error,setError]=useState([]);
  const[emailerror,setEmailError]=useState('');
  const navigate=useNavigate();
  const[contacterr,setContacterr]=useState('');
  const[fileerr,setFileerr]=useState('');
  function checkContact()
  {
    var RegExp = /^[0-9]{10}$/;
  if(!contact)
  {
    setContacterr("The contact no field is required");
  }
  else if(!RegExp.test(contact)) {
      setContacterr("Invalid Contact no.");    
    }
   
  }
  function checkMail()
  {

    let regEmail =/^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
    if(!email)
  {
    setEmailError("The email field is required");
  } 
  else if(!regEmail.test(email)){
        setEmailError('Invalid Email address')
      }
  }
  function checkImage()
  {
    if(!file)
    {
      setFileerr("The image field is required")
    }
   else if ( !(/\.(jpe?g)$/i.test(file.name)) ) {
      setFileerr("Invalid Image type!!Upload jpg and jpeg only");
  }
  }

async function signUpHandler(e)
{
  e.preventDefault();

  const formdata= new FormData();
formdata.append('name',name);
formdata.append('contact_no',contact);
formdata.append('email',email);
formdata.append('password',password);
formdata.append('file_path',file);
//formdata.append('image',file);
//console.log(formdata);
let result=await fetch("http://localhost:8000/api/register/user",{
    method:'POST',
  body:formdata}
  )
  let err=await result.json();
  console.warn("error",err.validate_err);
  if(result.status===201)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Student has been Added',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.setItem('student-info',JSON.stringify(err));
    navigate('/manage/students');
  }
  else
  {
    
    setError(err.validate_err);
    setEmailError(err.validate_err.email);
    setContacterr(err.validate_err.contact_no);
    setFileerr(err.validate_err.file_path);
    checkImage();
    checkContact();
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
        <h3>Student Registration</h3>
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
        <label>Contact No</label>
        <span className="text-danger"><sup>*</sup></span>
        <span className="text-danger m-2" id="contact"  >{contacterr}</span>
        <div className="input-group mb-3">
       
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">+91</span>
  </div>
  <input type="text" className="form-control" placeholder="contact no" aria-label="Contact" 
  aria-describedby="basic-addon1"
  onChange={(e)=>{setContact(e.target.value)}}
  //onBlur={(e)=>{checkContact()}}
  />
</div>
        <div className="mb-3">
          <label>Email address</label>
          <span className="text-danger"><sup>*</sup></span>
          <span  className=" m-2 text-danger">{emailerror}</span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            //onBlur={(e)=>checkMail(e.target.value)}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <span className="text-danger"><sup>*</sup></span>
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
          <span className="text-danger"><sup>*</sup></span>
          <span className=" m-2 text-danger">{fileerr}</span>
          <input className="form-control form-control-sm" id="formFileSm" type="file"
          onChange={(e)=>setFile(e.target.files[0])}
         // onBlur={(e)=>checkImage()}
          />
        </div>
       
        <div className="d-grid">
          <button type="submit" onClick={(e)=>signUpHandler(e)}  className="btn btn-primary">
            Register
          </button>
        </div>

      </form>
        </div>
        </div>
          </div>            
       </div> 
         </>
    )
}