import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Outlet, Navigate } from 'react-router-dom'

const Protected = () => {
    let auth = localStorage.getItem('student-info')
    let auth2 =localStorage.getItem('teacher-info')
    return(
        
        auth===null && auth2===null  ? <Outlet/> : <Navigate to="/"/>
    )
}

export default Protected

