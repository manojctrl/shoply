import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import './MainHeader.css'
const MainHeader = () => {
  return (
    <div className="main-heading">
      <Header/>
      <Navbar/>
    </div>
  )
}

export default MainHeader