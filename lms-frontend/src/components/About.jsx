import MyImage from './bg.jpg';
import MyImage2 from './bg3.jpg';
import MyImage1 from './bg2.jpeg';
import MyImage3 from './bg4.jpg';
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
export default function About() {
const [books,setBooks]=useState([]);

useEffect( ()=>{
  fetch("http://127.0.0.1:8000/api/books/display")
        .then((res) =>
            res.json())

        .then((data) => {
            setBooks(data);
            console.log(books)
          
        },)
},[])
  return (
  
    <div className='container-xxxl'  >
        <AliceCarousel autoPlay autoPlayInterval="2000" className="image" disableSlideInfo='false' disableButtonsControls="true" infinite='true'>
        <img src={MyImage} alt="background-library" className="image__img" style={{width:'100%'}} height={500}  />
        <img src={MyImage1} alt="background-library" className="image__img" style={{width:'100%'}} height={500}  />
        <img src={MyImage2} alt="background-library" className="image__img" style={{width:'100%'}} height={500}  />
        <img src={MyImage3} alt="background-library" className="image__img" style={{width:'100%'}} height={500}  />
       
</AliceCarousel>
<div className="image__overlay image__overlay--primary">
        <div className="image__title">Library <span style={{color:'red'}}>Management</span> System</div>
        <p className="image__description">
          <small>A portal where teacher can register students to the library,update their data,remove and  assign books to them.</small>
        </p>
    </div>
        <div className="container-xxl">
      <div className="album py-5 bg-light"> 
          <div className="row ">
          {books.map((book)=>(
            
             <div id="#container" className="col-md-4 "  key={book.id}>
             <div className="card mb-4  box-shadow" id='card'>
               <img id="#image" className="card-img-top" src={`http://localhost:8000/${book.file_path}`} alt="Card image" height={300}/>
               <div className="card-body">
                 <p className="card-text" style={{fontFamily:'Audiowide",sans-serif',fontSize:'25px'}}>{book.title}</p><p className="text-muted"> by {book.author} </p>
             
               </div>
             </div>
           </div>
         
         ))
        }
        </div>
   
       
        </div>
        </div>
        <footer>
          <section>
            
          </section>
        <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
    © 2022 Copyright:
    <a href="" className='text-dark' id="logo"><span className="text-reset " >&emsp;<span> <FontAwesomeIcon icon={faGithub} />  </span>Abhishekpanda626</span> </a> 
  </div> 
        </footer>
      
</div>

  );
}