import * as React from 'react';
import icon2 from "../assets/Group_17436.png"; 
import icon3 from "../assets/Group_16631.png"; 
import icon1 from "../assets/Group_16633.png"; 
import noti from "../assets/notification.png";
function ResponsiveAppBar() {

  return (
   <div className='topNav'>
        <div>

        </div>

        <div className='elements'>
            
             <span>
                <img src={icon2} alt="img" />
            </span>
            <span >  
                <img src={noti} alt="img" style={{margin:"7px"}} />
            </span>
            <span>
                <img src={icon3} alt="img" />
            </span>
             <span>
                <img src={icon1} alt="img"  style={{margin:"8px"}}/>
            </span>
            
        </div>
   </div>
  );
}
export default ResponsiveAppBar; 