
import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import AddClientModal from '../modal/AddClient';
import DeleteClientModal from '../modal/DeleteClient';
import { ProductService } from '../service/ProductService';
import './Styles.css';
import autoBind from 'react-autobind'


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {

            products4: null,
            editingRows: {},
            nowEditing: null,
            isAddClientOpen: false,
            isDeleteClientOpen: false,

        };

        this.columns = [
            { field: 'id', header: 'ID' },
            { field: 'firstName', header: 'First Name' },
            { field: 'lastName', header: 'Last Name' },
            { field: 'dateOfBirth', header: 'Date Of Birth' },
            { field: 'phoneNumber', header: 'Phone Number' },
            { field: 'mobile', header: 'Mobile Number' },
            { field: 'city', header: 'City' },
            { field: 'street', header: 'Street' },
            { field: 'hNumber', header: 'House Number' },
            { field: 'v1', header: 'First Vaccination Date' },
            { field: 'v2', header: 'Second Vaccination Date' },
            { field: 'v3', header: 'Third Vaccination Date' },
            { field: 'v4', header: 'Forth Vaccination Date' },
            { field: 'vaccinationProducer', header: 'Vaccination Producer' },
            { field: 'positiveDate', header: 'Positive to Covid' },
            { field: 'negativeDate', header: 'Negative to Covid' },

        ];

        this.statuses = [
            { label: 'In Stock', value: 'INSTOCK' },
            { label: 'Low Stock', value: 'LOWSTOCK' },
            { label: 'Out of Stock', value: 'OUTOFSTOCK' }
        ];

        this.productService = new ProductService();

        this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
        this.onCellEditComplete = this.onCellEditComplete.bind(this);
        this.onRowEditComplete2 = this.onRowEditComplete2.bind(this);
        this.onRowEditChange = this.onRowEditChange.bind(this);
        autoBind(this);
    }

    componentDidMount() {
        this.fetchProductData('products4');
    }

    fetchProductData(productStateKey) {
        this.productService.getProductsSmall().then(data => {
            let data_fixed = []
            data.forEach(r => {
                let r_m = { ...r }
                r_m.firstName = r.fullName.firstName;
                r_m.lastName = r.fullName.lastName;
                r_m.city = r.address.city
                r_m.street = r.address.street
                r_m.hNumber = r.address.houseNumber
                r_m.v1 = r.covidDetails.v1
                r_m.v2 = r.covidDetails.v2
                r_m.v3 = r.covidDetails.v3
                r_m.v4 = r.covidDetails.v4
                r_m.vaccinationProducer = r.covidDetails.vaccinationProducer
                r_m.positiveDate = r.covidDetails.positiveDate
                r_m.negativeDate = r.covidDetails.negativeDate


                data_fixed.push(r_m)
            })
            console.log(data_fixed);
            this.setState({ [`${productStateKey}`]: data_fixed })
        });
    }

    isPositiveInteger(val) {
        let str = String(val);
        str = str.trim();
        if (!str) {
            return false;
        }
        str = str.replace(/^0+/, "") || "0";
        let n = Math.floor(Number(str));
        return n !== Infinity && String(n) === str && n >= 0;
    }


    onCellEditComplete(e) {
        let { rowData, newValue, field, originalEvent: event } = e;

    }



    onRowEditComplete2(e) {
        console.log(23456789);
        let products4 = [...this.state.products4];
        let { newData, index } = e;

        products4[index] = newData;

        // fix data
        newData.fullName.firstName = newData.firstName
        newData.fullName.lastName = newData.lastName
        newData.address.city = newData.city
        newData.address.street = newData.street
        newData.address.houseNumber = newData.hNumber
        newData.covidDetails.v1 = newData.v1
        newData.covidDetails.v2 = newData.v2
        newData.covidDetails.v3 = newData.v3
        newData.covidDetails.v4 = newData.v4
        newData.covidDetails.vaccinationProducer = newData.vaccinationProducer
        newData.covidDetails.positiveDate = newData.positiveDate
        newData.covidDetails.negativeDate = newData.negativeDate



        this.setState({ products4 }, () => {
            this.productService.setProductsSmall(newData)
        });
    }

     onRowEditChange(e) {
         this.setState({ editingRows: e.data });
     }

     setActiveRowIndex(index) {
         let editingRows = { ...this.state.editingRows, ...{ [`${this.state.products3[index].id}`]: true } };
         this.setState({ editingRows });
     }

    cellEditor(options) {

        if (options.field === 'dateOfBirth')
            return this.dateEditor(options);
        if (options.field === 'v1')
            return this.dateEditor(options);
        if (options.field === 'v2')
            return this.dateEditor(options);
        if (options.field === 'v3')
            return this.dateEditor(options);
        if (options.field === 'v4')
            return this.dateEditor(options);
        if (options.field === 'positiveDate')
            return this.dateEditor(options);
        if (options.field === 'negativeDate')
            return this.dateEditor(options);
        else
            return this.textEditor(options);
    }

    textEditor(options) {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }

      statusEditor(options) {
          return (
              <Dropdown value={options.value} options={this.statuses} optionLabel="label" optionValue="value"
                  onChange={(e) => options.editorCallback(e.value)} placeholder="Select a Status"
                  itemTemplate={(option) => {
                      return <span className={`product-badge status-${option.value.toLowerCase()}`}>{option.label}</span>
                  }} />
          );
      }



    dateEditor(options) {
        console.log(options);
        return <Calendar id="basic" value={options.value} onChange={(e) =>
            options.editorCallback(e.value)
        } />
    }


     statusBodyTemplate(rowData) {
         return this.getStatusLabel(rowData.inventoryStatus);
     }



    dateOfBirthBodyTemplate(rowData) {
        const date = new Date(rowData.dateOfBirth)
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }

    v1BodyTemplate(rowData) {
        const date = new Date(rowData.v1)
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }
    v2BodyTemplate(rowData) {
        const date = new Date(rowData.v2)
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }
    v3BodyTemplate(rowData) {
        const date = new Date(rowData.v3)
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }
    v4BodyTemplate(rowData) {
        const date = new Date(rowData.v4)
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }
    positiveDateBodyTemplate(rowData) {
        const date = new Date(rowData.positiveDate)
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }    
    negativeDateBodyTemplate(rowData) {
        const date = new Date(rowData.negativeDate)
        return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    }

    toggleDeleteClientPopup() {
        this.setState({ isDeleteClientOpen: !this.state.isDeleteClientOpen })
    }
    toggleAddClientPopup() {
        this.setState({ isAddClientOpen: !this.state.isAddClientOpen })
    }


    render() {
        const { isAddClientOpen, isDeleteClientOpen, isM_addressOpen, isNumbersOpen, isCovidDetailsOpen } = this.state
        return (
            <div className="client-data-table">
                <Toast ref={(el) => this.toast = el} />


                <div className="card p-fluid">

                    <DataTable value={this.state.products4} editMode="row" dataKey="id" editingRows={this.state.editingRows}
                        onRowEditChange={this.onRowEditChange} onRowEditComplete={this.onRowEditComplete2}
                        responsiveLayout="scroll">

                        {
                            this.columns.map(({ field, header }) => {
                                return <Column key={field} field={field} header={header}
                                    body={field === 'dateOfBirth' && this.dateOfBirthBodyTemplate || 
                                    field === 'v1' && this.v1BodyTemplate || 
                                    field === 'v2' && this.v2BodyTemplate || 
                                    field === 'v3' && this.v3BodyTemplate || 
                                    field === 'v4' && this.v4BodyTemplate || 
                                    field === 'positiveDate' && this.positiveDateBodyTemplate || 
                                    field === 'negativeDate' && this.negativeDateBodyTemplate  }
                                    editor={(options) => this.cellEditor(options)}
                                    style={{ width: '20%' }}></Column>
                                 return <Column key={field} field={field} header={header} filter sortable style={{ width: '25%' }}></Column>
       

                            })
                                    
                            }

                        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                    <input
                        type="button"
                        value="Add Client"
                        onClick={this.toggleAddClientPopup}
                    />
                    {isAddClientOpen && <AddClientModal
                        handleClose={this.toggleAddClientPopup}
                    />}
                    <input
                        type="button"
                        value="Delete Client"
                        onClick={this.toggleDeleteClientPopup}
                    />
                    {isDeleteClientOpen && <DeleteClientModal
                        handleClose={this.toggleDeleteClientPopup}
                    />}
                </div>
            </div>
        );
    }
}
