
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import AuthContext from './component/context/AuthContext';
import Layout from './component/Layout/Layout';
import UserList from './component/User/UserList';
import { useContext } from 'react';
import UserState from './component/context/UserContext/UserState';
function App() {
  const {user}=useContext(AuthContext)
  console.log(user);
  return (
    <>
    <Routes> {!user&& <Route path='*' element={ <Login/>}/>}

    </Routes>
    <div >
      {user && (
      <UserState>
      <Layout>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/user' element={<UserList/>} />

        </Routes>
      </Layout>
      </UserState>)}
    </div>
    </>
  );
}

export default App;
