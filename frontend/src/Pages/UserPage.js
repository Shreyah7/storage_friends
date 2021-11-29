import './UserPage.css';
import React, {useState, useEffect, Component} from "react";
import Axios from 'axios';
import {Redirect, Route} from 'react-router-dom';



/*
notes:
- make password invisible when typing : html label for textbox
- other filters for searching
next steps:

- 
*/



function UserPage() {
  

    const [loginEmail, setEmail1] = useState('');
    const [Password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [UserId, setUserID] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [tempEmail, setTempEmail] = useState('');

    console.log("email when set user: " + Email);

    const [Phone, setPhone] = useState('');
    const [UserAddress, setUserAddress] = useState('');
    const [userList, setUserList] = useState([]);



  const [mostListingsList, setMostListingsList] = useState([]); // AQ2
  //const [freq, setFreq] = useState(0);

  const [popularCitiesList, setPopularCitiesList] = useState([]); // AQ1

  const [cityListingList, setCityListingsList] = useState([]); // SEARCH
  const [Address, setAddress] = useState('temp');

  const [newPassword, setNewPassword] = useState("");

  

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setUserList(response.data)
    })
  },[])

 

  // Get User Info based on Email
  const getUser = (tempEmail) => {
    console.log("email of get user: " + tempEmail);
    Axios.post(`http://localhost:3002/api/post/email`, {tempEmail:tempEmail}).then((resp) => {
      //setUserList(response.data)
      //alert('UserId: ' + resp.data[0].UserId + ' First Name: '
      console.log("DDDD" + resp + "DDD");
 

      if (Object.entries(resp.data).length !== 0) {
        setUserID(resp.data[0].UserId)
        setFirstName(resp.data[0].FirstName)
        setLastName(resp.data[0].LastName)
        setEmail(resp.data[0].Email)
        setPhone(resp.data[0].Phone)
        setUserAddress(resp.data[0].UserAddress)
        setPassword(resp.data[0].Password)
      }
    
      

      /*
      return (
        <div className = "card">
          <h1> Email: {resp.data.Email} </h1>
          <p> First Name: {resp.data.FirstName}</p>
        </div>
      );
      */
    })
  }

  // UPDATE
  const updatePassword = (Email) => {
    Axios.put(`http://localhost:3002/api/update`, {
      Email: Email,
      oldPassword: Password,
      newPassword: newPassword
    });
    setNewPassword("")
  };

  // DELETE email
  const deleteUser = (Email) => {
    Axios.delete(`http://localhost:3002/api/delete/${Email}`);
  };

  const deleteUser2 = (Email) => {
    Axios.delete(`http://localhost:3002/api/delete`, {
      Email: Email,
      Password: Password
    });
  };

  // SEARCH for listings in city x
  const getListingsInCity = (Address) => {
    Axios.get(`http://localhost:3002/api/get/cityListings/${Address}`).then((response) => {
      setCityListingsList(response.data)
    })
  };
  
  // AQ 1
  const getPopularCities = () => {
    Axios.get(`http://localhost:3002/api/get/popularCities/${Address}`).then((response) => {
      setPopularCitiesList(response.data)
    })


  };

  // AQ 2
  const getUsersMostListings = () => {
    Axios.get(`http://localhost:3002/api/get/mostListings/${Address}`).then((response) => {
      setMostListingsList(response.data)
    })
  };

  
  return (
    <div className="App">
      <h1> StorageFriends </h1>

      <div className="form">

        
        <h2> Delete User Account: </h2>
        <div className="form">
          <label> Enter Email </label>
            <input type="text" name="Email" onChange={(e) => {
              setEmail(e.target.value)
          }}/>
          <button onClick={() => { deleteUser(Email) }}> Delete</button>
        </div>

        <h2> Change Password: </h2>
        <div className="form">
          <label> Enter your email </label>
            <input type="text" name="Email" onChange={(e) => {
              setEmail(e.target.value)
          }}/>
          <label> Enter old password </label>
            <input type="text" name="oldPassword" onChange={(e) => {
              setPassword(e.target.value)
          }}/>
          <label> Enter new password </label>
            <input type="text" name="updatePassword" onChange={(e) => {
              setNewPassword(e.target.value)
          }}/>
          <button onClick={() => { updatePassword(Email) }}> Update</button>
        </div>


      </div>

      <h1> </h1>

      <div class="wrapper">
        <div id="one">
          <h2> Read User Info: </h2>
        
          <label> Enter email to search </label>
            <input type="text" name="tempEmail" onChange={(e) => {
              setTempEmail(e.target.value)
          }}/>
          <button onClick={() => { getUser(tempEmail) }}> Get</button>
          
        </div>

        <div id="two">
          <h2> User Info: </h2>
          <p> <b>UserId:</b> {UserId} </p>
          <p> <b>First Name:</b> {FirstName} </p>
          <p> <b>Last Name:</b> {LastName} </p>
          <p> <b>Email:</b> {Email} </p>
          <p> <b>Phone:</b> {Phone} </p>
          <p> <b>Address:</b> {UserAddress} </p>
          <p> <b>Password:</b> {Password} </p>
        </div>

        
      </div>

      <h1> </h1>

      <div class="wrapper">
        <div id="one">
          <h2> Users with Most Listings: </h2>
          <div>
            <button onClick={() => { getUsersMostListings() }}> Search </button>
          </div>
        </div>

        <div id="two">
          {mostListingsList.map((val) => {
            return (
              <div style={{height: '40px'}} className = "smallCard"> 
                <p> <b> Name: {val.FirstName} {val.LastName} </b> </p> 
                <p>Listings: {val.freq}</p>
              </div>
            );
            ;
          })}
        </div>
      </div>

      <h1> </h1>

      <div class="wrapper">
        <div id="one">
          <h2> Most Popular Cities: </h2>
          <div>
            <button onClick={() => { getPopularCities() }}> Search </button>
          </div>
        </div>

        <div id="two">
          {popularCitiesList.map((val) => {
            return (
              <div style={{height: '40px'}} className = "smallCard"> 
                <p> <b> Name: {val.Address}</b> </p> 
                <p>Listings: {val.freq}</p>
              </div>
            );
            ;
          })}
        </div>

      </div>


      <div class="form">
      <h2> Find Listings: </h2>
        <label> Enter City </label>
          <input type="text" name="Address" onChange={(e) => {
            setAddress(e.target.value)
        }}/>
        <label> Minimum sqft </label>
          {/* <input type="text" name="Address" onChange={(e) => {
            setAddress(e.target.value)
        }}/> */}
        <label> Maximum Price </label>
          {/* <input type="text" name="Address" onChange={(e) => {
            setAddress(e.target.value)
        }}/> */}
        
        <button onClick={() => { getListingsInCity(Address) }}> Search </button>

        
      </div>

      {cityListingList.map((val) => {
        return (
          <div class="card">
            <h2>Listing {val.ListingId} </h2>
            <p class="rent">${val.Rent}/mo.</p>
            <p class="rent"> Space: {val.Space} ft</p>
            <p><button>View Details</button></p>

          
          </div>
        );
        ;
      })}

    </div>
  );
}

export default UserPage;

// to run: npm start