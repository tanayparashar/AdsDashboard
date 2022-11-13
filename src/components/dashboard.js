import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import Switch from '@mui/material/Switch';
import fb from "../assets/fb.png"; 
import google from "../assets/google.png"; 
import yt from "../assets/youtube.png";  
import moment from 'moment'
import { Dropdown } from 'primereact/dropdown';
import live from "../assets/live.png";  
import exs from "../assets/exsauted.png";  
import trash from "../assets/trash.png";  
import edit from "../assets/edit-2.png";  
import { Filter } from '@mui/icons-material';



var url="https://ads-dashboard-backend.herokuapp.com/api/v1/campaign";
const leftToolbarTemplate = () => {
    return (
        <React.Fragment>
            {/* <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
        </React.Fragment>
    )
}

const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} />
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} /> */}
        </React.Fragment>
    )
}

const imageBodyTemplate = (rowData) => {

    return <img src={`${rowData.productId.imageUrl}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
}
const dateTemp = (rowData) => {

    return <div>
        {`${moment(rowData.dateStart).format('MMM-DD-YYYY')} - ${moment(rowData.dateEnd).format('MMM-DD-YYYY')}`}
    </div>
}
const statusTemp = (rowData) => {

    if(Date.now()>rowData.dateEnd)
    {
        return <img src={exs} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }
    else
    {
        return <img src={live} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }
}
const imagePlatformTemplate = (rowData) => {
    switch (rowData.platform)
    {
        case "Google":
            return <img src={google} alt=""/>; 
        case "Facebook":
            return <img src={fb} alt=""/>;
        case "Youtube":
            return <img src={yt} alt=""/>;
        default:
            return null;
    }
}


export const Dashboard = () => {

    const [data,setData]=useState();
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [globalFilter, setGlobalFilter] = useState(null);

    const [platform,setplatform]=useState("");
    const [range,setrange]=useState("");


    let obj=[{label:"Google",value:"Google"},{label:"Youtube",value:"Youtube"},{label:"Facebook",value:"Facebook"}];
    let obj1=[{label:"30 days",value:30},{label:"60 days",value:60},{label:"90 days",value:90}]

    const toast = useRef(null);
    const dt = useRef(null);

    async function getCampaigns()
    {
        let res=await fetch(url);
        res=await res.json();
        res=res.map(ele=>{
                return { ...ele, id: ele._id }
        })
        console.log(res);
        setData(res);
    }
    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => null} placeholder="Search..." />
            </span>
            <div> 
                <span style={{ marginLeft:"20px" }} >Select Platform</span>           
                <Dropdown value={platform} options={obj} onChange={(e) => setplatform(e.value)} placeholder="Select a Platform" style={{ marginLeft:"20px",marginRight:"20px" }}/>
                <span style={{ marginRight:"20px" }} >Select Date</span>           
                <Dropdown value={range} options={obj1} onChange={(e) => setrange(e.value)} placeholder="Select Days"/>
            </div>
        </div>
    );
    const actionBodyTemplate = (rowData) => {
        function editC()
        {

        }
        async function deleteC(id)
        {
            await fetch("https://ads-dashboard-backend.herokuapp.com/api/v1/campaign/"+id, { method: 'DELETE' });
            getCampaigns();
        }
        return (
            <React.Fragment>
                <img src={edit} alt="" onClick={() =>{editC(rowData)}} style={{marginRight:"20px"}}/>
                <img src={trash} alt="" onClick={() => deleteC(rowData._id)} />
            </React.Fragment>
        );
    }
    const imageActiveTemplate = (rowData) => {
        async function handleChange(val,id,data)
        {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"status": !val})
            };
            await fetch("https://ads-dashboard-backend.herokuapp.com/api/v1/campaign/"+id, requestOptions);
            getCampaigns();
        }
        return(
        <span>
        <Switch
        checked={rowData.active}
        onChange={(e)=>{handleChange(rowData.active,rowData.id,rowData)}}
        inputProps={{ 'aria-label': 'controlled' }}
        />

        </span>
        )
    }
    async function getCampaignsFilter()
    {
        let url="";
        if(platform!=="" && range!=="")
        {
            url="https://ads-dashboard-backend.herokuapp.com/api/v1/campaign?platform="+platform+"&days="+range;
            let res=await fetch(url);
            let data=await res.json();
            if(res.ok)
            {
                data=data.map(ele=>{
                    return { ...ele, id: ele._id }
                 })
                console.log(data);
                setData(data);
            }
            else{
                setData([]);
            }           
        }
        else if(platform!=="")
        {
            console.log()
            url="https://ads-dashboard-backend.herokuapp.com/api/v1/campaign?platform="+platform;
            let res=await fetch(url);
            let data=await res.json();
            if(res.ok)
            {
                data=data.map(ele=>{
                    return { ...ele, id: ele._id }
                 })
                console.log(data);
                setData(data);
            }
            else{
                setData([]);
            }      
        }
        else if(range!=="")
        {
            url="https://ads-dashboard-backend.herokuapp.comapi/v1/campaign?days="+range;
            let res=await fetch(url);
            let data=await res.json();
            if(res.ok)
            {
                data=data.map(ele=>{
                    return { ...ele, id: ele._id }
                 })
                console.log(data);
                setData(data);
            }
            else{
                setData([]);
            }      
        }
        
    }
     useEffect(()=>{
        if(platform!=="" || range!==""){
            getCampaignsFilter();
        }
        else
        {
            getCampaigns();
        }
    },[platform,range]);
    return(
        <div className='dtContainer'> 
        <div className="datatable-crud-demo" style={{marginTop:"1.5%"}}>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={data} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="active" header="Active" sortable style={{ }} body={imageActiveTemplate}></Column>
                    <Column field="name" header="Name" sortable style={{  }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="platform" header="Date Range" sortable style={{ }} body={dateTemp}></Column> 
                    <Column field="clicks" header="Clicks" sortable style={{ }}></Column>
                    <Column field="budget" header="Budget" sortable style={{ }}></Column>
                    <Column field="location" header="Location" sortable style={{ }}></Column>
                    <Column field="platform" header="Platform" sortable style={{ }} body={imagePlatformTemplate}></Column>
                    <Column field="platform" header="Status" sortable style={{ }} body={statusTemp}></Column> 
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
        </div>
    ); 
}
      