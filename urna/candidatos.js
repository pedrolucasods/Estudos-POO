import {Pessoa} from "./pessoas.js"

export class Candidato extends Pessoa{
    constructor(nome,partido,numero){
        super(nome)
        this.partido = partido
        this.numero = numero
    }

}