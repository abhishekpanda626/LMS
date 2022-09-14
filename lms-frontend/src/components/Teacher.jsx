import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom'

const Teacher = () => {
    let auth = localStorage.getItem('teacher-info')
    return(
        
        auth ? <Outlet/> : <Navigate to="/teacher/login"/>
    )
}

export default Teacher