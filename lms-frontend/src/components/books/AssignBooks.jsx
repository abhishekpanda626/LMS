import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export default function Assign()
{
    var id=localStorage.getItem('bid');
    const[userid,setUserid]=useState('');
    const[bookid,setBookid]=useState('');
    const[book,setBook]=useState([]);
    const[user,setUser]=useState([]);
    const navigate=useNavigate();
    
    function fetchBooks()
{
    fetch("http://127.0.0.1:8000/api/books/"+id)
    .then((res) =>
        res.json())

    .then((data) => {
       // console.log("book:",data);
         setBook(data);     
    },)
}
function fetchuser()
{
  fetch("http://127.0.0.1:8000/api/users")
  .then((res) =>
      res.json())

  .then((data) => {
        //console.log("users:",data);
      setUser(data);
    // console.log(data.book.title);
  },)
}
async function assignBook()
{
       
    var data={   
        'book_id':bookid,
        'user_id':userid,
     }
     console.log("postdata;",data)
    let result= await fetch("http://localhost:8000/api/books/assign",{
        method:'POST',
        headers:{'Content-Type':'application/json',
                  'Accept':'application/json'
      },
      body:JSON.stringify(data)
    });
    console.warn(result.status)
    if(result.status===200)
    {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${book.title} book is assigned`  ,
        text:'return the book within 10 days'
        
      })
      navigate('/books/manage');
    }
    else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Some error occurred !!!!',
            text:'please try again.',
            showConfirmButton: false,
            timer: 1500
            
          })
    }
}

 useEffect(()=>{
    setBookid(id);
    fetchBooks();
    fetchuser();
   
 },[])
    return (
        <div className='container' style={{marginTop:'50px'}}>
            <center>
            <Card style={{ width: '300px' ,height:'300px' }}>
      <Card.Img variant="top" height={300} src={`http://localhost:8000/${book.file_path}`}/>
      <Card.Body>
        <Card.Title>{book.title} <br /> <small className='text-muted'>by {book.author}</small> </Card.Title>
        
        <select className='form-select form-select-lg mb-3' onChange={(e)=>setUserid(e.target.value)} >
                <option value="">Select a Student</option>
                { user.map(users=>(
                 <option key={users.id} defaultChecked value={users.id} >{users.id}-{users.name}</option>
                 ))}
               </select>

        <button className='btn btn-primary' onClick={(e)=>assignBook()}>Assign Book</button>
      </Card.Body>
    </Card>
    </center>
        </div>
    )
}