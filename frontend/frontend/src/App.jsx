
import React from 'react'
import {Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreatePage from './components/CreatePage';
import { Box } from '@chakra-ui/react';



const App = () => {
  //const {products}=useProductStore();
  return (
    <div>
      {/* create a div */}
      <Box minH={"100vh"}>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="create" element={<CreatePage/>}/>
        </Routes>
      </Box>
    </div>
  )
}

export default App