import { Candidato } from "./candidatos.js"
import {Pessoa} from "./pessoas.js"

class Urna{
    #votantes
    #candidatos
    constructor(){
        this.#votantes = []
        this.#candidatos = [
            {
                nome:"Nulo",
                quantidade_votos:0
            }
        ]
    }

    cadastrar_candidato(candidato){
        const validar_candidato = this.#validar_candidato(candidato)
        if(validar_candidato){
            candidato.quantidade_votos = 0
            this.#candidatos.push(candidato)
            console.log("Candidato Cadastrado!")
        }
    }

    #validar_candidato(novo_candidato){
        let campo_valido = true
        if(!novo_candidato || Object.keys(novo_candidato) <3){
            console.log("Candidato Inválido!")
            return false
        }

        const campos = Object.keys(novo_candidato)
        const campos_corretos = ["nome","partido","numero"]
        campos_corretos.forEach(campo_correto => !campos.includes(campo_correto) ? campo_valido = false : true)
        if(!campo_valido){
            console.log("Campos Inválidos!")
            return false
        }

        for(const campo of campos){
            if(!novo_candidato[campo]){
                console.log(`${campo} Ausente!`)
                return false
            }
        }

        const candidatos = this.#candidatos
        if(candidatos.length > 1){
            const mesmo_candidato = candidatos.filter(candidato => 
                candidato.numero == novo_candidato.numero ||
                candidato.partido == novo_candidato.partido)

            if(mesmo_candidato.length){
                console.log("Canditado com mesmo Partido ou Numero encontrado!")
                return false
            }
        }
        return true
    }

    votar(eleitor,voto){
        if(this.#candidatos.length <= 2){
            console.log("Precisa ter 2 ou mais candidatos cadastrados!")
            return
        }

        if(!eleitor || Object.keys(eleitor).length < 1){
            console.log("Eleitor Inválido!")
            return
        }

        const documentos = eleitor instanceof Pessoa ? eleitor.apresentar_documentos() : false
        const validar_eleitor = this.#validar_eleitor(documentos)
        if(!validar_eleitor){
            console.log("Informações Inválidas!")
            return
        }
        
        if(this.#votantes.includes(documentos.cpf)){
            console.log("Voto já Registrado nesse CPF!")
            return
        }

        this.#aplicar_voto(voto)
        this.#registro_votacao(eleitor)
        console.log("Voto concluído!")
        return
    }

    #validar_eleitor(documentos){
        return !documentos || !documentos.cpf || 
        documentos.cpf.length < 11 || 
        documentos.cpf.length > 11 || !documentos.titulo ?  false : true
    }

    #aplicar_voto(voto){
        let voto_valido = false
        let candidatos = this.#candidatos
        candidatos.forEach(candidato => {
            if(candidato.nome != "Nulo"){
                if(candidato.numero == voto){
                    candidato.quantidade_votos+=1
                    console.log(`Você votou no ${candidato.nome}`)
                    voto_valido = true
                    return
                }
            }
        });

        if(voto_valido == false){
            const nulo = candidatos.filter(candidato => candidato.nome == "Nulo")
            nulo[0].quantidade_votos += 1
            console.log("Voto Nulo!")
        }
    }

    #registro_votacao(eleitor){
        const documentos = eleitor.apresentar_documentos()
        return this.#votantes.push(documentos.cpf)
    }

    ver_votantes(){
        console.log(this.#votantes)
    }

    apuracao(){
        console.log(this.#candidatos)
    }
}

const Pedro = new Pessoa("Pedro","001.111.112-19",true)
const Marcos = new Pessoa("Marcos","001.131.112-19",true)
const Joao = new Pessoa("Joao","001.111.112-19",true)
const Mario = new Pessoa("Mario","001.111.142-19",true)
const Joaquin = new Pessoa("Joaquin","001.111.102-19",true)

const urna_eletronica = new Urna()
const lista_candidatos = [
        {
            nome:"Flavio",
            partido:"PL",
            numero:"22"
            
        },
        {
            nome:"Lula",
            partido:"PT",
            numero:"13"
            
        }
]
lista_candidatos.forEach(candidato => urna_eletronica.cadastrar_candidato(candidato))
const candidato = new Candidato("Renan Santos","Missao","14")
urna_eletronica.cadastrar_candidato()
urna_eletronica.votar({nome:"Pedro"},17)
urna_eletronica.apuracao()
// urna_eletronica.cadastrar_candidato(candidato)


// urna_eletronica.apuracao()
// urna_eletronica.ver_votantes()
// urna_eletronica.votar(Pedro,22)
// urna_eletronica.apuracao()
// console.log(Pedro)