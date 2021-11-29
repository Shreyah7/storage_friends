import './App.css';
import React, {useState, useEffect, Component} from "react";
import Axios from 'axios';
import {BrowserRouter,Routes, Route, Link, useNavigate} from 'react-router-dom'
import Login from './Pages/Login';
import UserPage from './Pages/UserPage';
import ProtectedRoute from './Pages/ProtectedRoute';


/*
notes:
- make password invisible when typing : html label for textbox
- other filters for searching
next steps:
- 
*/
//const [isAuth, setIsAuth] = useState(false);

// class App extends React.Component {
//   // state={
//   //   isLog: false
//   // }

//    Content(){
//     let history = useHistory();
    

//     function handleClick() {
//         history.push("/report");
//     }
    
//     return (
//         <div>
//             <button onClick={handleClick}>Click me</button>
//         </div>
//     )

// }


//   // handleLogin = (isLog) => this.setState({isLog})
//   render() {
//     // const {isLog} = this.state;
//     return(
//       <div>
//         <BrowserRouter>
//           <Routes>
//             <Route exact path='/' element={<Login/>}/>
//             <Content />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     )
//   }

//   //<Route exact path='/' element={() => !isLog ?<Login isLogin={this.handleLogin}/>:<UserPage/>}/>
// //            <ProtectedRoute path = "/UserPage" element = {UserPage} isAuth={isAuth}/>

  
// }

//    Content(){
//     let history = useHistory();
    

//     function handleClick() {
//         history.push("/report");
//     }
    
//     return (
//         <div>
//             <button onClick={handleClick}>Click me</button>
//         </div>
//     )

// }

function App(){


  function Content(){
    let history = useNavigate();
    

    function handleClick() {
        history.push(UserPage);
    }
    
    return (
        <div>
            <button onClick={handleClick}>Click me</button>
        </div>
    )

}
//            <Content />

    // const {isLog} = this.state;
    return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<UserPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    )

}

export default App;

// to run: npm start