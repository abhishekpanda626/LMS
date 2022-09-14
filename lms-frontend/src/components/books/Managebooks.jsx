import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import './teacher.css';
export default function Managebooks(){

const [data,setData]=useState([]);
const navigate=useNavigate();
const[ query, setQuery]=useState('');
function fetchdata()
{
    fetch("http://127.0.0.1:8000/api/books/display")
    .then((res) =>
        res.json())

    .then((data) => {
       

        setData(data);
      
    },)
}
async function search(key)
{
  console.log("key",key)
  let result= await fetch("http://localhost:8000/api/books/search/"+key)
 result=await result.json();

  
  setQuery(result);


}
useEffect( ()=>{
   fetchdata();
   search();

},[])
async function deleteHandler(e,id){
e.preventDefault();
 await fetch("http://localhost:8000/api/books/delete/"+id,{method:'DELETE'});
fetchdata();
}
const addHandler=()=>{
    navigate('/books/add');
}
const assignHandler=(id)=>{
  localStorage.setItem('bid',id);
  navigate('/books/assign');
}
const editHandler=(id)=>{
localStorage.setItem('bid',id);
navigate('/books/update');
}
function showQuery()
{

  return(
    <>
    <div className="container">
<table className="table table-hover m-md-5">

    {query?
  
      query && query.map(book=>(
        <tbody key={book.id}>
        <tr>
          <th scope="row"  >
            <img  src={`http://localhost:8000/${book.file_path}`} alt="image not found" width={80} height={80}/>
            
            </th>
          <th>{book.title}</th>
          <td>{book.author}</td>
          <td>{book.genre}</td>
          <td>{book.published_date}</td>
          <td>
          <button className="btn btn-primary" onClick={(e)=>assignHandler(book.id)} >Assign</button> 
          </td>
           
          <td>
             <button className="btn btn-info" onClick={(e)=>editHandler(book.id)} >Edit</button> </td>
          <td> <button className="btn btn-danger" onClick={(e)=>deleteHandler(e,book.id)}>Delete</button> </td>
         
        </tr>
        
      </tbody>
      ))
       :
      
     <></>
    
      }
      </table> </div>
      </>
  )
}
 return (
        <>
<div className="container ">
    <div className="container">
    <div className='container' >
   
<span style={{marginTop:'60px',marginLeft:'400px',font:'60px bold sans-serif ',color:"yellowgreen"}}  >BOOKS</span>
<div style={{marginLeft:'390px',marginTop:'30px'}}>
  <input  type="text" placeholder="search.." name="search" id="search" onChange={(e)=>{search(e.target.value)}}/>
 </div>
    <button className='btn btn-primary' onClick={(e)=>addHandler(e)}  style={{ marginTop:'30px',marginLeft:'900px'}}>
      Add new book
    </button>
  </div>
    </div>
    {showQuery()}
<div className="container">
<table className="table table-hover m-md-5">
  <thead>
    <tr>
      <th scope="col">Cover Page</th>
      <th scope="col">Title</th>
      <th scope="col">Author Name</th>
      <th scope="col" >Genre</th>
      <th scope="col">Published Date</th>
      <th scope="col" colSpan={3} >Action</th>
    </tr>
  </thead>

  
  {
    data && data.map(book=>(
      <tbody key={book.id} id="hide">
      <tr>
        <th scope="row"  >
          <img  src={`http://localhost:8000/${book.file_path}`} alt="image not found" width={80} height={80}/>
          
          </th>
        <th>{book.title}</th>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.published_date}</td>
        <td>
          <button className="btn btn-primary" onClick={(e)=>assignHandler(book.id)} >Assign</button> 
          </td>
        <td> <button className="btn btn-info" onClick={(e)=>editHandler(book.id)} >Edit</button> </td>
        <td> <button className="btn btn-danger" onClick={(e)=>deleteHandler(e,book.id)}>Delete</button> </td>
       
      </tr>
      
    </tbody>
    ))
  }
  
</table>
</div>


</div>

        </>
    )
}