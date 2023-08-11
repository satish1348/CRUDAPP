//import logo from './logo.svg';
import './App.css';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import AddEdit from './Components/AddEdit'
import View from './Components/View';
function App() {
  return (
    <div className="App">
   
      <ToastContainer position='top-center' />
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path='/addedit' element={<AddEdit></AddEdit>}></Route> 
          <Route path='/update/:id' element={<AddEdit></AddEdit>}></Route> 
          <Route path='/view/:id' element={<View></View>}></Route> 
          
        </Routes>
        </Router>
        
      {/* <h1>Main Page</h1> */}
    </div>
  );
}

export default App;