import {BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BlogPreview from './components/BlogPreview';

import { useState } from 'react'
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';


function beforeApp() {
  const [refresh, setRefresh] = useState(false);
  
  const handlePostCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <div className='max-w-2xl mx-auto mt-10'>
      <BlogForm onPostCreated = {handlePostCreated}/>
      <BlogList key={refresh}/>
     
    </div>
  );
}
function App(){
  return(
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element = { <Home/>} />
          <Route path='/login' element = { <Login/>} />
          <Route path='/signup' element = { <Signup/>}  />
          <Route path='/create' element = { <BlogForm/>}  />
          <Route  path='/post/:id' element = { <BlogList/>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
