const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

/**
 * cpf - string
 * name - string
 * id - uuid
 * statement - []
 */
app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    
    const customerAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf
    );

    if(customerAlreadyExists) {
        return response.status(400).json({ erro: 'Customer already exists!'})
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    //201 - criado
    return response.status(201).send("Conta criada com suceso")
})

app.listen(3333);