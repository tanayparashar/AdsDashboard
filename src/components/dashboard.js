import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import Switch from '@mui/material/Switch';
import fb from "../assets/fb.png"; 
import google from "../assets/google.png"; 
import yt from "../assets/youtube.png";  


var url="http://localhost:5000/api/v1/campaign";
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

const header = (
    <div className="table-header">
        <h5 className="mx-0 my-1">Manage Products</h5>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => null} placeholder="Search..." />
        </span>
    </div>
);
export const Dashboard = () => {

    const [data,setData]=useState();
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [globalFilter, setGlobalFilter] = useState(null);

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
    const actionBodyTemplate = (rowData) => {
        function editC()
        {

        }
        function deleteC(id)
        {
            console.log(id);
        }
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-5 ebuttonD" onClick={() =>{editC(rowData)}} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteC(rowData._id)} />
            </React.Fragment>
        );
    }
    const imageActiveTemplate = (rowData) => {
        function handleChange(val,id,data)
        {
            
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
    useEffect(()=>{
        getCampaigns();
    },[]);
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
                    <Column field="clicks" header="Clicks" sortable style={{ }}></Column>
                    <Column field="budget" header="Budget" sortable style={{ }}></Column>
                    <Column field="location" header="Location" sortable style={{ }}></Column>
                    <Column field="platform" header="Platform" sortable style={{ }} body={imagePlatformTemplate}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>
        </div>
        </div>
    ); 
}
      