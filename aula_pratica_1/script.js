// let nome = "Pedro"
// const sobrenome = "Correia"
// nome = 123456

// console.log(nome)

// function soma_numero(a,b){
//     return a+b
// }

class Pessoa{
    constructor(nome,sobrenome,cpf){
        this.nome = nome
        this.sobrenome = sobrenome
        this.cpf = cpf
    }

    apresentar(){
        console.log(`Meu nome é ${this.nome}`)
    }
}

let clientes = []
const cliente = new Pessoa("Pedro","Lucas",20)
clientes.push(cliente)
const cliente2 = new Pessoa("Hudson","Brandao",20)
clientes.push(cliente2)
const cliente3= new Pessoa("Abner","Arthur",20)
clientes.push(cliente3)

for(let cliente of clientes){
    cliente.apresentar()
}
