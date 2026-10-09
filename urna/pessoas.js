export class Pessoa{
    nome
    #cpf
    #titulo
    constructor(nome,cpf,titulo){
        this.nome = nome
        this.#cpf = cpf ? cpf.replace(/\D/g,"") : null
        this.#titulo = titulo
    }

    apresentar_documentos(){
        const documentos = {
            titulo: this.#titulo,
            cpf: this.#cpf,
        }

        return documentos
    }
}