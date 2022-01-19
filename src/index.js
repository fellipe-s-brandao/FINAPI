const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

//middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.params;

    //retorna oq a gente precisa
    const customer = customers.find(costumer => costumer.cpf === cpf);

    if(!customer) {
        return response.status(404).json({error: "Customer not found!"})
    }

    request.customer = customer;

    return next();
}

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

app.get('/statement/:cpf', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statement);
});

app.listen(3333);