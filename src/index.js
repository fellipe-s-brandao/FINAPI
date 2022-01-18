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

    //returna true ou false
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
});

app.get('/statement/:cpf', (request, response) => {
    const { cpf } = request.params;

    //retorna oq a gente precisa
    const customer = customers.find(costumer => costumer.cpf === cpf);

    if(!customer) {
        return response.status(404).json({error: "Customer not found!"})
    }

    return response.json(customers.statement);
});

app.listen(3333);