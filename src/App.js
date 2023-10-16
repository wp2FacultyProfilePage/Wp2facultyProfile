import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Admin from './Components/Admin/Login'
import Add from './Components/Add/Add';
import SignIn from './Components/SignIn/SignIn';
import Flip from './Components/Flip/Flip';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/" element={<Admin/>}/>
          <Route path ="/add" element={<Add/>}/>
         <Route path ="/signin" element={<SignIn/>}/>
         <Route path ="/flip" element={<Flip/>}/>
         </Routes>
      </Router>
    </div>
  );
}

export default App;
