import React, { Component } from 'react';
import autoBind from 'react-autobind'
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { ProductService } from '../service/ProductService';
import './Styles.css'

export default class DeleteClientModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchInput: '',
            clientToDelete: {
                firstName: '',
                lastName: '',
                id: '',
                city: '',
                street: '',
                hNumber: '',

            }
        };
        this.productService = new ProductService();

        autoBind(this);
    }

    handleChange(e) {
        if (e.key === 'Enter') {
            const elementToDelete = this.productService.getClient(this.state.searchInput)//333333333


            this.setState({ elementToDelete })
            //set state element to delete
        } else {
            this.setState({ searchInput: document.getElementById('search-id-input').value })
        }


    }
    render() {

        const { handleClose } = this.props

        const { clientToDelete, searchInput } = this.state
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={handleClose}>x</span>
                    <h1 className="my-4 font-weight-bold .display-4">Delete Client</h1>

                    <input
                        id='search-id-input'
                        type="input"
                        placeholder="Enter Id to delete"
                        onKeyUp={this.handleChange}
                    // value={searchInput} 
                    />
                    <Formik
                        initialValues={clientToDelete}
                        onSubmit={() => { }}
                    >
                        {formik => (
                            <div>:
                                <Form>
                                    
                                    <button onClick={() => {
                                        this.productService.deleteClient(this.state.searchInput)
                                    }} type="submit">Delete</button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}
//this.state.clientToDelete.id
