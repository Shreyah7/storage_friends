import './Login.css';
import React, {useState, useEffect, Component} from "react";
import Axios from 'axios';
import UserPage from './UserPage';
import { renderMatches } from 'react-router';
import {BrowserRouter,Routes, Route, Link, useNavigate, withRouter} from 'react-router-dom'



/*
notes:
- make password invisible when typing : html label for textbox
- other filters for searching
next steps:
- 
*/




function Login (props){

  let Navigate = useNavigate();

  
    

  const [loginEmail, setEmail1] = useState('');
  const [Password, setPassword1] = useState('');
  const [UserId1, setUserID1] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [UserAddress, setUserAddress] = useState('');
  const [userList, setUserList] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState();



   // Create user to insert into database
   const submitUser = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      //UserId: UserId,
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Phone: Phone,
      UserAddress: UserAddress,
      Password: Password
    });

    setUserList([
      ...userList,
      {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Phone: Phone,
        UserAddress: UserAddress,
        Password: Password
      },
    ]);
  };

  
  const handleSubmitLogin = (loginEmail, Password) => {
      

    console.log("loginEmail: " + loginEmail);

    Axios.post(`http://localhost:3002/api/get/user`, 
    {loginEmail : loginEmail, Password : Password}).then((response) => {
        console.log("not error");
     

        if (response.data != null) {
            setUserID1(response.data[0].UserId);
            setLoggedInUserId(UserId1);
            console.log("printing useris" + UserId1);
           Navigate("userPage");
        } else {
        }
    }).catch((err) => {
        console.log("error");
        console.error(err);
    });
 
  }



  
// const handleSubmitLogin = async () => {
//     try {
//         const response = await Axios.put(`http://localhost:3002/api/get/user`, {
//             method: 'PUT',
//             body: JSON.stringify({
//                 Email : Email, Password : Password
//             }),
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             }
//         })
//             .then(response => response.json())
//             .then(json => console.log(json));
//         console.log(response.data);
//     } catch (error) {
//         console.warn(error);
//     }
// }



  
  
  return (
    <div className="Login">
      <h1> StorageFriends </h1>

      <div className="form">

        <h2> Login: </h2>

        <label>Email</label>
            <input type="text" name="loginEmail" placeholder='example@email.com' onChange={(e) => {
            setEmail1(e.target.value)
        }}/>

        <label>Password</label>
            <input type="text" name="Password" placeholder='password123' onChange={(e) => {
            setPassword1(e.target.value)
        }}/>


        <button onClick={() => handleSubmitLogin(loginEmail, Password) }> Login</button>
        <h2> Create Account: </h2>

        <label>First Name</label>
        <input type="text" name="FirstName" onChange={(e) => {
          setFirstName(e.target.value)
        }}/>

        <label>Last Name</label>
        <input type="text" name="LastName" onChange={(e) => {
          setLastName(e.target.value)
        }}/>

        <label>Email</label>
        <input type="text" name="Email" onChange={(e) => {
          setEmail(e.target.value)
        }}/>

        <label>Phone</label>
        <input type="text" name="Phone" onChange={(e) => {
          setPhone(e.target.value)
        }}/>

        <label>User Address</label>
        <input type="text" name="UserAddress" onChange={(e) => {
          setUserAddress(e.target.value)
        }}/>

        <label>Password</label>
        <input type="text" name="Password" onChange={(e) => {
          setPassword1(e.target.value)
        }}/>

        <button onClick={submitUser}> Submit</button>



      </div>
    </div>
  );
}

export default Login;

// to run: npm start