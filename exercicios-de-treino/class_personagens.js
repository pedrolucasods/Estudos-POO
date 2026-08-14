class Personagem{
    #vida
    #ataque
    constructor(nome,vida,ataque){
        this.nome = nome
        this.#vida = this.#validar_saude(vida)
        this.#ataque = this.#validar_ataque(ataque)
    }

    #validar_ataque(ataque){
        return ataque < 1 ? 1 : ataque
    }

    #validar_saude(saude){
        return saude < 1 ? 10 : saude
    }

    ver_saude(){
        return this.#vida
    }

    ver_ataque(){
        return this.#ataque
    }

    atacar(alvo){
        if(!alvo instanceof Personagem){
            return "Alvo Não Identificado!"
        }
        return alvo.receber_dano(this.#ataque)
    }

    receber_dano(dano){
        if(dano > this.#vida){
            return this.#vida = 0
        }else{
            this.#vida -= dano
        }
    }
}

class Guerreiro extends Personagem{
    ataque_forte(alvo){
        if(!(alvo instanceof Personagem)){
            return "Alvo Não Identificado!"
        }
        const dano_maximo = this.ver_ataque() * 2
        return alvo.receber_dano(dano_maximo)
    }
}

class Mago extends Personagem{
    lancar_fogo(alvo){
        if(!alvo instanceof Personagem){
            return "Alvo Não Identificado!"
        }
        const dano_maximo = this.ver_ataque() * 3
        return alvo.receber_dano(dano_maximo)
    }
}

const guerreiro = new Guerreiro("Furia",100,10)
const mago = new Mago("Mago de Fogo",100,15)

console.log(mago.ver_saude())
guerreiro.atacar(mago)
console.log(mago.ver_saude())

console.log("###### Guerreiro Tomando #######")
console.log(guerreiro.ver_saude())
mago.lancar_fogo(guerreiro)
console.log(guerreiro.ver_saude())