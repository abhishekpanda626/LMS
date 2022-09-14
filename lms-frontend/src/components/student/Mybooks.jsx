import React, { useState, useEffect } from 'react';
export default function Show()
{
    var user=JSON.parse(localStorage.getItem('student-info'));
    const[book,setBooks]=useState([]);
    
   function fetchbooks()
    {
        fetch("http://localhost:8000/api/show/"+user.id)
              .then((res) =>
                  res.json())
              .then((data) => {
                  setBooks(data);
                
              },)
    }

    useEffect( ()=>{
        fetchbooks();
    },[])
    async function deleteHandler(e,id){
        e.preventDefault();
         await fetch("http://localhost:8000/api/delete/"+id,{method:'DELETE'});
        fetchbooks();
        }
       
  console.log(book);
    return(
        <div className="container">

            <table className='table table-hover m-md-5'>
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
        book.map(items=>(
      <tbody key={items.id}>
        <tr>
          <th scope="row"  >
            <img  src={`http://localhost:8000/${items.book.file_path}`} alt="image not found" width={80} height={80}/>
            
            </th>
          <th>{items.book.title}</th>
          <td>{items.book.author}</td>
          <td>{items.book.genre}</td>
          <td>{items.book.published_date}</td>
          <td> <button className="btn btn-danger" onClick={(e)=>deleteHandler(e,items.book.id)}>Return</button> </td>
         
        </tr>
        
      </tbody>
      ))
    }
            </table>
          
        
  </div>
    )
}