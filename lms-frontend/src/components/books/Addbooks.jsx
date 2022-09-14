import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function Addbooks()
{
const [title,setTitle]=useState('');
const [author,setAuthor]=useState('');
const [genre,setGenre]=useState('');
const [pdate,setPdate]=useState('');
const [file,setFile]=useState([]);
const navigate=useNavigate();
const [error,setError]=useState([]);
const[fileerr,setFileerr]=useState('');
//let data={title,author,genre,pdate,file};
function checkImage()
  {
    if(!file.name)
    {
      setFileerr("The image field is required")
      
    }
   else if ( !(/\.(jpe?g)$/i.test(file.name)) ) {
      setFileerr("Invalid Image type!!Upload jpg and jpeg only");
  }
  }
async function addHandler(e){
e.preventDefault();
//console.warn(data);
const formdata= new FormData();
formdata.append('title',title);
formdata.append('author',author);
formdata.append('genre',genre);
formdata.append('published_date',pdate);
formdata.append('image',file);
//console.log(formdata);
let result=await fetch("http://localhost:8000/api/books/add",{
    method:'POST',
  body:formdata});
  let err= await result.json();
  
  
 
  if(result.status===201)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'New book added!!! ',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/books/manage');
}
else{
  setError(err.validate_err);
  setFileerr(err.validate_err.file_path);
  checkImage();
}


}


    return(
        <>
        <div className="container" style={{backgroundColor: "#2779e2"}}>
        
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-8">

        <h1 className="text-white m-4">Add a new Book</h1>

        <div className="card" style={{borderRadius: "15px"}}>
          <div className="card-body">

            <div className="row align-items-center pt-3 pb-1">
              <div className="col-md-3 ps-5">
                <span className="mb-0 h6">Title</span><span className="text-danger"><sup>*</sup></span>
             
              </div>
              <div className="col-md-9 pe-5">
              <span className="text-danger m-2">{error.title}</span>
                <input 
                type="text"
                 placeholder="book title"
                  className="form-control form-control-lg"
                  onChange={(e)=>setTitle(e.target.value)}
                  />

              </div>
            </div>

            <hr className="mx-n3"/>

            <div className="row align-items-center py-1">
              <div className="col-md-3 ps-5">

              <span className="mb-0 h6">Author</span><span className="text-danger"><sup>*</sup></span>

              </div>
              <div className="col-md-9 pe-5">
              <span className="text-danger m-2">{error.author}</span>
                <input type="text" className="form-control form-control-lg" placeholder="author name"
                onChange={(e)=>setAuthor(e.target.value)}
                
                />

              </div>
            </div>
            <hr className="mx-n3"/>

            <div className="row align-items-center py-1">
              <div className="col-md-3 ps-5">

              <span className="mb-0 h6">Genre</span><span className="text-danger"><sup>*</sup></span>

              </div>
              <div className="col-md-9 pe-5">
              <span className="text-danger m-2">{error.author}</span>
              <input type="text" className="form-control form-control-lg" placeholder="Genre of the book"
              onChange={(e)=>setGenre(e.target.value)}
              />

              </div>
            </div>
            <hr className="mx-n3"/>
            <div className="row align-items-center py-1">
              <div className="col-md-3 ps-5">

              <span className="mb-0 h6">Date of Publication</span><span className="text-danger"><sup>*</sup></span>

              </div>
              <div className="col-md-9 pe-5">
              <span className="text-danger m-2">{error.published_date}</span>
              <input type="date" className="form-control form-control-lg" placeholder="Date of publish" 
              onChange={(e)=>setPdate(e.target.value)}
              />

              </div>
            </div>

            <hr className="mx-n3"/>

            <div className="row align-items-center py-1">
              <div className="col-md-3 ps-5">

              <span className="mb-0 h6">Upload Cover Page</span><span className="text-danger"><sup>*</sup></span>

              </div>
              <div className="col-md-9 pe-5">
              <span className="text-danger m-2">{fileerr}</span>
                <input className="form-control form-control-lg" id="formFileLg" type="file" 
                onChange={(e)=>setFile(e.target.files[0])}
                />
                <div className="small text-muted mt-2">Upload  cover page of the book in jpg/jpeg format.</div>

              </div>
            </div>

            <hr className="mx-n3"/>

            <div >
              <button type="button" className="btn btn-primary btn-lg" onClick={(e)=>addHandler(e)}>Add book</button>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>

        </div>
    
        </>
        
    )
}