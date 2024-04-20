import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Navbar/Header'
import Gallery from '../../Components/Gallery/Gallery'
import Home_Products from '../../Components/Home-product/Home_Products'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />

      <Gallery />
      <div>
        <Home_Products />
      </div>
    </div>
  );
}

export default Home