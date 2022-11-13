import logo from './logo.svg';
import { AddCampaign } from './components/addCampaign';
import { Dashboard } from './components/dashboard';
import ResponsiveAppBar from './components/navbar';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 
import './App.css'; 


function App() {
  return (
    <div className="">
        <ResponsiveAppBar/>
        <div className='appBody'>
          <AddCampaign/>
          <Dashboard/>
        </div>
    </div>
  );
}

export default App;
