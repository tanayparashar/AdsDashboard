import { Grid, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

import img from "../assets/Group_16855.png"
export const AddCampaign=()=>{
    const navigate = useNavigate();

    return(
        <Grid container className='appMainGrid'>
              <Grid container className='addCamp'>
                <div>
                  <Typography variant="h4" fontWeight={"bold"}>Your Campaigns</Typography>
                  <Typography display="block" fontWeight={"50"}>Check the list of campaign you created </Typography>
                </div>
                <div style={{cursor:"pointer"}} onClick={(e)=>{navigate("/create")}}>
                  <img src={img} alt="button"/>
                </div>
              </Grid>                        
          </Grid>
    );
}