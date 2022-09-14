import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom'

const Student = () => {
    let auth = localStorage.getItem('student-info')
    return(
        
        auth ? <Outlet/> : <Navigate to="/student/login"/>
    )
}

export default Student

