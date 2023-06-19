
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import AuthContext from './component/context/AuthContext';
import Layout from './component/Layout/Layout';
import UserList from './component/User/UserList';
import Fiscal from './component/Fiscal/Fiscal';
import { useContext } from 'react';
import UserState from './component/context/UserContext/UserState';
import RoleState from './component/context/RoleContext/RoleState';
import FiscalState from './component/context/FiscalContext/FiscalState'
import BookState from './component/context/BookContext/BookState';
import Book from './component/Book/Book';
import BookInfo from './component/Book/BookInfo';
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
        <RoleState>
          <FiscalState>
            <BookState>
      <Layout>
        <Routes>
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/user' element={<UserList/>} />
          <Route path='/fiscal' element={<Fiscal/>}/>
          <Route path='/book' element={<Book/>}/>
          <Route path='/bookinfo/:id' element={<BookInfo/>}/>
        </Routes>
      </Layout>
      </BookState>
      </FiscalState>
      </RoleState>
      </UserState>)}
    </div>
    </>
  );
}

export default App;
