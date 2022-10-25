const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Person = require('../models/person')

const app = express()

router.get('/', (req, res) => {
    Person.find((err, doc) => {
        if (err) {
            console.log(`err in GET ${err}`)
        }
        else {
            res.send(doc)
        }
    })
})





function insertDocument(req, res) {
    const { body } = req
    person = new Person()
    person.fullName.firstName = body.fullName.firstName
    person.fullName.lastName = body.fullName.lastName
    person.id = body.id
    person.dateOfBirth = body.dateOfBirth
    person.mobile = body.mobile
    person.phoneNumber = body.phoneNumber
    person.address.city = body.address.city
    person.address.street = body.address.street
    person.address.houseNumber = body.address.houseNumber
    person.covidDetails.v1 = body.covidDetails.v1
    person.covidDetails.v2 = body.covidDetails.v2
    person.covidDetails.v3 = body.covidDetails.v3
    person.covidDetails.v4 = body.covidDetails.v4
    person.covidDetails.vaccinationProducer = body.covidDetails.vaccinationProducer
    person.covidDetails.positiveDate = body.covidDetails.positiveDate
    person.covidDetails.negativeDate = body.covidDetails.negativeDate

    person.save((err, doc) => {
        if (!err)
            res.redirect('person/list')
        else {
            res.json(`Error- record not iserted ${err}`)
        }
    })
    // updatedClient = await Person.findByIdAndUpdate({id:person.id},{body},{upsert:true, new:true})

}

async function updateRecord(req, res) {
    const { body } = req
    console.log(body, req.params.id)
    try {
        const updatedUser = await Person.findOneAndUpdate({ id: req.params.id }, body, { new: true, upsert: true })
   
        res.json(updatedUser)
    }
    catch (err) {
        res.status(500).json({ error: err })
        consol.log(err)
    }


}


router.get('/list', (req, res) => {
    res.json('from list')
    Person.find((err, docs) => {
        if (!err) {
            res.render('person/list', { list: docs })
        }
        else {
            res.json(`Error- record not found ${err}`)
        }
    })
})

router.post('/:id', (req, res) => {
    if (req.body.id == '') {
        insertDocument(req, res)
    }
    else {
        updateRecord(req, res)
    }
})


async function m_find(req, res) {
    //const { body } = req
    //console.log(body, req.params.id)
    Person.find({ id: req.params.id }, (err, doc) => {
        if (!err) {
            console.log(doc);
            res.json(doc)
        }
        else {
            res.json(`Error- id not found ${err}`)
        }
    })

    // try {
    //     const foundUser = await Person.findOne({ id: req.params.id }, (err,doc))
    //     console.log(body, req.params.id)

    //     res.json(foundUser)
    // }
    // catch (err) {
    //     res.status(500).json({ error: err })
    //     console.log(err)
    // }

}


router.get('/:id', (req, res) => {
    //myId=0
    //console.log(typeof(Number(req.params.id)));
    //var myId = Number(req.params.id)
    //Person.find({}, (err, doc) => {
       // console.log(doc.filter(function (el) {return el.id==req.params.id}));
       m_find(req, res)
    //    if (!err) {
    //         console.log('234');
    //         res.json(doc.filter(function (el) {return el.id==Number(req.params.id)}))
    //     }
    //})
})

router.get('/delete/:id', (req, res) => {
    console.log(req.params.id)

    Person.findOneAndDelete({ id: req.params.id }, (err, dec) => {
        if (!err) {
            res.send("OOk")
        }
        else {
            console.log(`error during delete ${err}`)
        }
    })

})





module.exports = router
