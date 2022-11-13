import {Grid} from "@mui/material";
import { Dropdown } from 'primereact/dropdown';
import { useState,useEffect } from "react";
import { Calendar } from 'primereact/calendar';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from "react-router-dom";

export const CreateCampaign=()=>{
    const [platform,setPlatform]=useState("");
    const [product,setproduct]=useState();
    const [budget, setbudget] = useState(null);
    const [location, setlocation] = useState('');
    const [name, setname] = useState('');
    const navigate = useNavigate();

    const [sproduct,ssproduct]=useState();
    const [sdate,ssdate]=useState();
    const [edate,sedate]=useState()
    async function getProducts()
    {
        let res=await fetch("http://localhost:5000/api/v1/product");
        res=await res.json();
        let x=res.map((ele)=>{
            return {label:ele.name,value:ele._id}
        })
        setproduct(x);
    }


    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    async function postCampaign()
    {
        var obj={
            name:name,
            dateStart:sdate ,
            dateEnd: edate,
            clicks: randomIntFromInterval(1,1000),
            budget: budget*1000,
            location: location,
            platform: platform,
            active: true,
            productId:sproduct
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)           
        };
        await fetch('http://localhost:5000/api/v1/campaign', requestOptions);
        navigate("/");
    }

    useEffect(()=>{
        getProducts();
    },[])

    const citySelectItems = [
    {label: 'Google', value: 'Google'},
    {label: 'Facebook', value: 'Facebook'},
    {label: 'Youtube', value: 'Youtube'},
    
];
 
    return(
        <Grid container className="card">
            <Grid item xs={12}  sx={{m:2}}>
<                   InputText styleClass="w-full" value={name} onChange={(e) => setname(e.target.value)} placeholder="Name of campaign"/>
            </Grid>
            <Grid item xs={12} md={4} sx={{m:2}}>
                <Dropdown value={platform} options={citySelectItems} onChange={(e) => setPlatform(e.value)} placeholder="Select a Platform"/>
            </Grid>
            <Grid item xs={12} md={4} sx={{m:2}}>
                <Dropdown value={sproduct} options={product} onChange={(e) => ssproduct(e.value)} placeholder="Select a Product"/>
            </Grid>
             <Grid item xs={12} md={4} sx={{m:2}}>
                <Calendar value={sdate} onChange={(e) => ssdate(e.value)} placeholder="Campaign start date"></Calendar>
            </Grid>
             <Grid item xs={12} md={4} sx={{m:2}}>
                <Calendar value={edate} onChange={(e) => sedate(e.value)} placeholder="Campaign end date"></Calendar>
            </Grid>
            <Grid item xs={6} sx={{m:2}}>
                <h5>Budget: {budget*1000}</h5>
                <Slider value={budget} onChange={(e) => setbudget(e.value)} />

            </Grid>
            <Grid item xs={6} sx={{m:2}}>
                <span className="p-input-icon-right">
                    <i className="pi pi-directions" />
                    <InputText value={location} onChange={(e) => setlocation(e.target.value)} placeholder="Location" style={{minWidth:"100%"}} />
                </span>
            </Grid>
            <Grid container sx={{m:2}}>
                <Button label="Save" onClick={postCampaign} />
            </Grid>            
        </Grid>
    );
}