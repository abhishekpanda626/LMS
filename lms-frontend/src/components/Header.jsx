import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
export default function Header() {
  var student=JSON.parse(localStorage.getItem('student-info'));
  var teacher=JSON.parse(localStorage.getItem('teacher-info'));
  const navigate=useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/');
  }
  return (
    <Navbar sticky="top" bg="dark"  variant="dark" expand="lg">
      <Container fluid="xxl">
        <Navbar.Brand >  <FontAwesomeIcon icon={faBookOpen} /> Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
            {
               student ?
              <>
                 <Nav.Link href='/'>Home</Nav.Link>
                 
              </>
              : null
            }

            {
               teacher ?
              <>
                 <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/books/manage'>Books</Nav.Link>
              <Nav.Link href="/manage/students">
               Students
              </Nav.Link>
            
              </>
              : null
            }
     
            {
               teacher===null && student===null  ?
               <>
                <Nav.Link href='/'>Home</Nav.Link>
               <NavDropdown title="Login" id="basic-nav-dropdown">
              <NavDropdown.Item href="/teacher/login">Login as Teacher</NavDropdown.Item>
              <NavDropdown.Item href="/student/login">
                Login as Student
              </NavDropdown.Item>
            </NavDropdown>
              </>
              : null
            }
           </Nav>
           </Navbar.Collapse >
           {
              student || teacher?
              <>
<Navbar.Collapse className="justify-content-end text-white" >
<Navbar.Text className='text-white-50'>
              Signed in as <FontAwesomeIcon icon={faUser} />&nbsp;
              </Navbar.Text>
<NavDropdown title={student && student.name+'(student)'  || teacher && teacher.name +'(teacher)'} id="basic-nav-dropdown">             
              <NavDropdown.Item href="/student/profile">Dashboard</NavDropdown.Item>
              <NavDropdown.Item onClick={logout}>
                Logout <FontAwesomeIcon icon={faRightFromBracket} />
              </NavDropdown.Item>
            </NavDropdown>
            
        </Navbar.Collapse>
              </>
              :
              null
           }
       
       </Container>
    </Navbar>
  );
}