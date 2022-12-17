
import './App.css';
import { useState, useEffect } from 'react'
import { Api } from './api/api.js'

function App() {
  const [plants, setPlants] = useState(null)

  useEffect(() => {
    Api.get('/plants').then(({data}) => {
      setPlants(data)
      console.log(data);
    }).catch(e => console.log(e))
  })
  return (
    <div className="App">
     <h1>{plants}</h1>
    </div>
  );
}

export default App;
