import { AddCampaign } from './components/addCampaign';
import { Dashboard } from './components/dashboard';
import ResponsiveAppBar from './components/navbar';
import {
  Route,
  Routes,
} from "react-router-dom";
import { CreateCampaign } from './components/createCampaign';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 
import './App.css'; 


function App() {
  return (
    <Routes>
        <Route path='/' element={<div className="">
              <ResponsiveAppBar/>
              <div className='appBody'>
                <AddCampaign/>
                <Dashboard/>
              </div>
          </div>} />
        <Route path="/create" element={<CreateCampaign/>}/>
      </Routes>
    
  );
}

export default App;
