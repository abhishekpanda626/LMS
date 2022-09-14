import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom'

const Teacher = () => {
    let auth = localStorage.key(0);
    console.log("auth:",auth)
    return(
        
        auth==="teacher-info" ? <Outlet/> : <Navigate to="/"/>
    )
}

export default Teacher