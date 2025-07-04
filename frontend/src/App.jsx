import { useState } from 'react'
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';


function App() {
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

export default App
