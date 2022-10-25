const mongoose = require('mongoose')

const url = `mongodb://ronnimaayan:roni2001@ac-rde82ls-shard-00-00.wn7rukh.mongodb.net:27017,ac-rde82ls-shard-00-01.wn7rukh.mongodb.net:27017,ac-rde82ls-shard-00-02.wn7rukh.mongodb.net:27017/?ssl=true&replicaSet=atlas-b4hf4d-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

module.exports=mongoose