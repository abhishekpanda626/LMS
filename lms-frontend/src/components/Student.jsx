import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom'

const Student = () => {
    let auth = localStorage.key(0);
    console.log(auth);
    return(
        
        auth==="student-info" ? <Outlet/> : <Navigate to="/"/>
    )
}

export default Student

