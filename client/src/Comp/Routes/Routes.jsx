import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout.jsx'
import Welcome from '../Welcome/Welcome.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import Login from '../Login/Login.jsx'
import Logout from '../Logout/Logout.jsx'

const Routes = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children: [
      {
        path:"/",
        element:<Welcome/>,
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"signup",
        element:<SignUp/>
      },
      {
        path:"login",
        element:<Logout/>
      }
    ]
  }
])

export default Routes