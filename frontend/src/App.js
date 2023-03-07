import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import NavBar from './components/layout/NavBar/NavBar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
// import PostDetails from './components/pages/ProductDetails'

// Auth or User imports
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import UpdateProfile from './pages/updateProfile/UpdateProfile'
import UpdatePassword from './pages/updatePassword/UpdatePassword'
import ForgotPassword from './pages/forgetPassword/ForgotPassword'
import NewPassword from './pages/passwordRset/NewPassword'


import ProtectedRoute from './components/route/ProtectedRoute'
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'
import store from './store'
import axios from 'axios'



function App() {

  useEffect(() => {
    store.dispatch(loadUser())

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          {/* <Route path="/post/:id" component={PostDetails} exact /> */}


          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/forgot" component={ForgotPassword} exact />
          <Route path="/password/reset/:token" component={NewPassword} exact />
          <ProtectedRoute path="/me" component={Profile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/password/update" component={UpdatePassword} exact />
        </div>


        {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
      </div>
    </Router>
  );
}

export default App;
