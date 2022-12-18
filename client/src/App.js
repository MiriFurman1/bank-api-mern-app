
import './App.css';
import { useState, useEffect } from 'react'
import { Api } from './api/api.js'


function App() {
  const [accounts, setAccounts] = useState(null)
  const [showAccounts, setShowAccounts] = useState(false)

  useEffect(() => {
    Api.get('/accounts').then(({ data }) => {
      setAccounts(data)
      console.log(data);
    }).catch(e => console.log(e))
  }, [])

  const showUsers = () => {
    setShowAccounts(prev => !prev)
  }
  const deleteAccount = (e) => {
    let id=e.target.className
    console.log(id);
    try {
      Api.delete(`/accounts/${id}/delete`)
    }
    catch (error) {
      console.log(error);
    }
  }
  
  const addAccount=()=>{

  }
  return (
    <div className="App">
      <h1>hello</h1>
      <button onClick={showUsers}>see all users</button>
      <button onClick={addAccount}> Add new account</button>
      <button> Deposit money</button>
      <button> withdraw money</button>
      <button> Transfer money</button>
      <form>
        <label>user name</label>
        <input></input>
        <label>user id</label>
        <input></input>
        <label>user cash</label>
        <input></input>
        <label>user credit</label>
        <input></input>
        <button>add user</button>
        
        
      </form>
      {showAccounts && accounts.map((account) => {
        return (<div key={account.userId}>
          <h4>Name: {account.name}</h4>
          <h5>Id: {account.userId}</h5>
          <h5>Cash: {account.cash}</h5>
          <h5>Credit: {account.credit}</h5>
          <button onClick={deleteAccount} className={account._id}>delete</button>
        </div>
        ) 
      })}

    </div>
  );
}

export default App;
