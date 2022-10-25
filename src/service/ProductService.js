import axios from 'axios'
axios.defaults.withCredentials = true;

const baseURL = 'http://localhost:8080'
export class ProductService {

    getProductsSmall() {
        const url = `${baseURL}/person`
        return fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            //.then(response => response.text())
            //.then(result => console.log(result))
            .catch(err => console.error(err));
    }

    setProductsSmall(data) {
        const url = `${baseURL}/person/${data.id}`

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(
            data
        );

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    getClient(id){
        const url = `${baseURL}/person/${id}`

        return fetch(url, {
            method: 'get',
        })
            .then(response =>{
                console.log('123');

                console.log(response.body.id);

                 response.json();})
            .catch(err => console.error(err));   
    }


    deleteClient(id){
        console.log(id);
        const url = `${baseURL}/person/delete/${id}`
        console.log('idshosh');

        return fetch(url, {
            method: 'GET',
        })
            .then(response =>{
                console.log(response);
                 response.json();})
            .catch(err => console.error(err));   
    }

}