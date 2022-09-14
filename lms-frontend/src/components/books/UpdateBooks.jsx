import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function UpdateBooks()
{
    var id=localStorage.getItem('bid');
    const[data,setData]=useState([]);
    const [title,setTitle]=useState('');
const [author,setAuthor]=useState('');
const [genre,setGenre]=useState('');
const [pdate,setPdate]=useState('');
const [file,setFile]=useState('');
const[error,setError]=useState([]);
const navigate=useNavigate();
//let data={title,author,genre,pdate,file};
function fetchdata()
{
    fetch("http://127.0.0.1:8000/api/books/"+id)
    .then((res) =>
        res.json())

    .then((data) => {
        console.log(data);
        setData(data);
        setTitle(data.title);
        setAuthor(data.author);
        setGenre(data.genre);
        setPdate(data.published_date);
        setFile(data.file_path);
       
    },)
}
useEffect(()=>{
     fetchdata();
},[])
async function updateHandler(e,bid){
e.preventDefault();

//console.warn(data);
const formdata= new FormData();
formdata.append('title',title);
formdata.append('author',author);
formdata.append('genre',genre);
formdata.append('published_date',pdate);
formdata.append('image',file);
console.log(formdata);
let result=await fetch("http://localhost:8000/api/books/update/"+bid+"?_method=PUT",{
    method:'POST',
  body:formdata});
  let err= await result.json();
  if(result.status===200)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: ' Book is updated!!! ',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/books/manage');
}
else{
  setError(err.validate_err);
}


}








    return(
        <>
        <div className="container" style={{backgroundColor: "#2779e2"}}>
        
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-8">
        <h1 className="text-white m-4">Update Book</h1>
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
                  defaultValue={data.title}
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
                defaultValue={data.author}
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
              defaultValue={data.genre}
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
              defaultValue={data.published_date}
              onChange={(e)=>setPdate(e.target.value)}
              />

              </div>
            </div>

            <hr className="mx-n3"/>

            <div className="row align-items-center py-1">
              <div className="col-md-3 ps-5">

                <h6 className="mb-1">Upload Cover page</h6>

              </div>
              <div className="col-md-9 pe-5">
              <span className="text-danger m-2">{error.file_path}</span>
                <input className="form-control form-control-lg" id="formFileLg" type="file" 
                defaultValue={data.file_path}
                onChange={(e)=>setFile(e.target.files[0])}
                /> <br />
               <img style={{width:50}} src={"http://localhost:8000/"+data.file_path}/>
                <div className="small text-muted mt-2">Upload  cover page of the book in jpg/jpeg format.</div>

              </div>
            </div>

            <hr className="mx-n3"/>

            <div >
              <button type="button" className="btn btn-primary btn-lg" onClick={(e)=>updateHandler(e,data.id)}>Update</button>
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