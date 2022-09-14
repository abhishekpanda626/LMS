import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Login()
{

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const[emailerror,setEmailError]=useState('');
  const navigate= useNavigate();

  const[error,setError]=useState([]);
   // console.log(email,password);  



   function checkMail()
   {
     let regEmail =/^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,4}$/;
     if(!email)
     {
       setEmailError("The email field is required");
     }
     else  if(!regEmail.test(email)){
         setEmailError('Invalid Email address')
       }
   }


async function signInHandler(e)
{
  e.preventDefault() ; 
  let data={password,email};
  console.warn(data);
  let result=await fetch("http://127.0.0.1:8000/api/login/admin",{
    method:'POST',
    headers:{'Content-Type':'application/json',
              'Accept':'application/json'
  },
  body:JSON.stringify(data)
});
let final = await result.json();
if(result.status===200)
{

  localStorage.setItem('teacher-info',JSON.stringify(final));
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'logged in',
    showConfirmButton: false,
    timer: 1500
  })
  navigate('/');
 // console.log("result:",final);
}
else if(result.status===206)
{
  console.log(final.error);
  Swal.fire({
    icon: 'error',
    position:'top-end',
    title: 'Oops...',
    text: final.error,
    showConfirmButton:false,
    timer:1500
  });
}
else if(result.status===202)
{
  setEmailError(final.validate_err.email);
 setError(final.validate_err);
}

//console.log(result);

//navigate('/');
}
    return(
       
      <>
    
       <div className="container-fluid" >
            <div  className="row d-flex justify-content-center flex-column min-vh-100 align-items-center d-grid gap-3">
          <div className="col-md-4 border border-3 mx-auto p-2 bg-light border " >
          <form onSubmit={(e)=>signInHandler(e)}>
       <center><h3> Sign In as Teacher</h3></center> 
        <div className="mb-3">
          <label>Email address</label> <span id='err' className="text-danger"><sup>*</sup>&emsp;</span> <span className="text-danger"><sup>{emailerror}</sup></span>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onBlur={(e)=>checkMail(e.target.value)}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <span className="text-danger"><sup>*</sup>&emsp;</span> <span  className="text-danger"><sup>{error.password}</sup></span>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign-in
          </button>
        </div>
        <br />
        <center><p >
         Not a Member ? <a style={{textDecoration:'none'}} href="/teacher/signup">Signup</a>
        </p>
</center>  
      </form>
            </div>
          </div>
           
        </div>
      </>
    )
}