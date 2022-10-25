import React, { Component } from 'react';
import autoBind from 'react-autobind'
import { Formik, Form } from 'formik';
import { TextField } from './TextField';
import * as Yup from 'yup';
import { ProductService } from '../service/ProductService';

import './Styles.css'

export default class AddClientModal extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
        this.productService = new ProductService();

        autoBind(this);
    }

    render() {

        const { content, handleClose } = this.props

        const validate = Yup.object({
            firstName: Yup.string()
                //.min(3, 'Must be 15 characters or less')
                //.max(15, 'Must be 15 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            id: Yup.number()
               // .min(9, 'ID must be 9 charaters')
               // .max(9, 'ID must be 9 charaters')               
                .required('ID is required'),
            mobile: Yup.number()
                .required('Required'),
            city: Yup.string()
                .required('Required'),
            street: Yup.string()
                .required('Required'),
            hNumber: Yup.number()
                .required('Required'),
            dateOfBirth: Yup.date()
                .required('Required')

        })
        return (
            <div className="popup-box">
                <div className="box">
                    <span className="close-icon" onClick={handleClose}>x</span>

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            id: '',
                            city: '',
                            street: '',
                            hNumber: '',
                            dateOfBirth: '',
                            phone: '',
                            mobile: '',
                            v1: '',
                            v2: '',
                            v3: '',
                            v4: '',
                            vaccinationProducer: '',
                            positiveDate: '',
                            negativeDate: ''

                        }}
                        validationSchema={validate}
                        onSubmit={values => {
                            const { id, firstName, lastName, city, street, hNumber, dateOfBirth, phone, mobile,
                                   v1, v2, v3, v4, vaccinationProducer,positiveDate, negativeDate } = values
                            const elementToDB = {
                                id, fullName: { firstName, lastName },
                                address: {
                                    city, street, houseNumber: hNumber
                                },
                                phone, mobile, dateOfBirth,
                                covidDetails:
                                {
                                     v1 , v2, v3, v4, vaccinationProducer, positiveDate, negativeDate
                                }
                            }
                            this.productService.setProductsSmall(elementToDB)
                            console.log(values)
                        }}
                    >
                        {formik => (
                            <div>:
                                <h1 className="my-4 font-weight-bold .display-4">Add Client</h1>
                                <Form>
                                    <TextField label="ID" name="id" type="number" />
                                    <TextField label="Date Of Birth" name="dateOfBirth" type="date" />
                                    <TextField label="First Name" name="firstName" type="text" />
                                    <TextField label="last Name" name="lastName" type="text" />
                                    <TextField label="Phone Number" name="phone" type="text" />
                                    <TextField label="Mobile" name="mobile" type="text" />

                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <TextField label="City" name="city" type="text" />
                                        <TextField label="street" name="street" type="text" />
                                        <TextField label="House Number" name="hNumber" type="text" />

                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <TextField label="1# Vaccination Date" name="v1" type="date" />
                                        <TextField label="2# Vaccination Date" name="v2" type="date" />
                                        <TextField label="3# Vaccination Date" name="v3" type="date" />
                                        <TextField label="4# Vaccination Date" name="v4" type="date" />
                                    </div>
                                    <TextField label="Vaccination Producer" name="vaccinationProducer" type="string" />
                                    <TextField label="Positive to Covid date" name="positiveDate" type="date" />
                                    <TextField label="Negative to Covid date" name="negativeDate" type="date" />

                                    <button className="btn btn-dark mt-3" type="submit">Register</button>
                                    <button className="btn btn-danger mt-3 ml-3" type="reset">Reset</button>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}
