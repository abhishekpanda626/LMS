import React, { useState, useEffect } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import './teacher.css';
export default function Showbooks(){
const [data,setData]=useState([]);
const [query,setQuery]=useState('');

useEffect( ()=>{
    fetch("http://127.0.0.1:8000/api/books/display")
          .then((res) =>
              res.json())

          .then((data) => {
              setData(data);
            
          },)
},[])

async function search(key)
{
  let result= await fetch("http://localhost:8000/api/books/search/"+key)
  let final=await result.json();
  setQuery(final);


}

    return (
        <>
<div className="container ">
    <div className="container">
    <center><h1>Books</h1></center>
<div style={{marginLeft:'390px',marginTop:'30px'}}>
  <input  type="text" placeholder="search.." name="search" id="search" onChange={(e)=>{search(e.target.value)}}/>
 </div>   </div>
<div className="container">
<table className="table table-hover m-md-5">
  <thead>
    <tr>
      <th scope="col">Cover Page</th>
      <th scope="col">Title</th>
      <th scope="col">Author Name</th>
      <th scope="col" >Genre</th>
      <th scope="col" >Published Date</th>
    </tr>
  </thead>
  {query?
    query&&query.map(book=>(
      <tbody key={book.id}>
      <tr>
      <th scope="row"  >
          <img  src={`http://localhost:8000/${book.file_path}`} alt="image not found" height={80} width={80}/>
          
          </th>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.published_date}</td>
       
      </tr>
      
    </tbody>
    ))
  :
  data&&data.map(book=>(
    <tbody key={book.id}>
    <tr>
    <th scope="row"  >
        <img  src={`http://localhost:8000/${book.file_path}`} alt="image not found" height={80} width={80}/>
        
        </th>
      <td>{book.title}</td>
      <td>{book.author}</td>
      <td>{book.genre}</td>
      <td>{book.published_date}</td>
     
    </tr>
    
  </tbody>
  ))}
  
</table>

</div>


</div>

        </>
    )
}