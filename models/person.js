const mongoose = require('mongoose')

var personSchema = new mongoose.Schema({
    fullName: {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        }
       
    },
    id: {
        type: Number,
        required: true,
        unique: true

    },
    dateOfBirth: {
        type: Date,
        required: true

    },
    mobile: {
        type: Number,
        required: true

    },
    phoneNumber: {
        type: Number,
        required: true

    },
    address: {
        city : {
        type: String,
        required: true

        },
        street : {
            type: String,
            required: true

        },
        houseNumber : {
            type: Number,
            required: true

        }

    },
    covidDetails :{
        v1: {
            type: Date
        },
        v2: {
            type: Date
        },
        v3: {
            type: Date
        },
        v4: {
            type: Date
        },
        vaccinationProducer: {
            type: String,
        },
        positiveDate: {
            type: Date,
        },
        negativeDate: {
            type: Date,
        }
    
    }
})

//mongoose.model('person', personSchema)
const personModel = mongoose.model('person', personSchema)
module.exports = personModel