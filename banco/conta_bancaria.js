class Pessoa {
    constructor(nome, cpf, idade) {
        this.nome = nome
        this.cpf = cpf
        this.idade = idade
    }

    falar() {
        return `Ola, eu sou o ${this.nome}`
    }
}

class BancoCentral {
    static transferir_valor(emitente, destino, valor, senha) {
        const operacao_saque = emitente.sacar(valor, senha)
        if(emitente == destino){
            console.log('Não é possível Enviar Dinheira para você mesmo!')
            return
        }
        if (!operacao_saque.status) {
            console.log(operacao_saque.msg)
            return
        } else if (operacao_saque.status) {
            destino.depositoViaBC(valor)
        }

    }
    
}

class Conta {
    #senha
    #dono
    #saldo
    constructor(dono, senha) {
        this.#dono = this.#criar_conta(dono, senha)
        this.#saldo = 0;
    }

    get dono() {
        if (this.#dono == '') {
            return `Conta não existe!`
        }
        return this.#dono
    }

    // set dono(dono_conta){
    //     return this.dono = dono_conta
    // }

    // get sempre retorna algo
    // set é para atualizar o valor
    get saldo() {
        if (this.#dono != null) {
            return this.#saldo <= 300 ? this.#saldo : "Valor impede demonstração"
        }

    }

    set saldo(valor) {
        if (this.#dono != null) {
            this.#saldo += valor
        }
    }

    #criar_conta(pessoa, senha) {
        const validarSenha = this.#validarSenha(senha)
        if (!validarSenha) {
            return 'Senha inválida!'
        }
        if (!this.#validar_dados_dono) {
            return `Falha, seus dados estõa inválidos`
        }
        if (this.#dono == null) {
            return pessoa
        } else {
            if (pessoa == this.#dono) {
                return `Você já tem uma conta!`
            } else {
                return `Essa conta não é sua!`
            }
        }

    }

    sacar(valorSaque, senha) {
        if (valorSaque > 0) {
            if (this.#dono != null) {
                if (!this.#validarSenha(senha)) {
                    const resposta = { status: false, msg: 'Senha Incorreta' }
                    return resposta
                }
                if ((this.#saldo - valorSaque) >= 0) {
                    this.#saldo -= valorSaque
                    const resposta = { status: true, msg: 'Saque Realizado!' }
                    return resposta
                } else {
                    const resposta = { status: false, msg: 'Saldo Insuficiente' }
                    return resposta
                }
            }
        }else{
            const resposta = { status: false, msg: 'Valor de Saque Inválido' }
            return resposta
        }

    }

    extrato(senha) {
        if (this.#dono != null) {
            if (!this.validarSenha(senha)) {
                console.log("Senha incorreta")
                return
            }
            console.log(`Seu saldo é ${this.#saldo}`)
        }
    }

    depositar(valor, senha) {
        if (this.#dono != null) {
            if (!this.#validarSenha(senha)) {
                console.log("Senha incorreta")
                return
            }
            if (valor < 0) {
                console.log("O valor depositado não pode ser negativo")
                return;
            }
            if (valor > 5000) {
                console.log("Valor muito alto. Dirija-se ao caixa. Atendimento das 10:00h às 15:00hs")
                return;
            }
            this.#saldo += valor
        }
    }

    #validarSenha(senha) {
        if (!senha || (this.#dono && this.#senha != senha)) {
            return false
        }
        return this.#senha = senha
    }

    #validar_dados_dono(pessoa) {
        if (pessoa.nome == '' || pessoa.cpf == '' || pessoa.idade == '') {
            return false
        } else {
            return true
        }
    }

    depositoViaBC(saldo) {
        this.#saldo += saldo
    }

}

// minhaConta = new Conta()
// minhaConta.depositar(500, "admin")
// minhaConta.saldo = 200
// minhaConta.endereco = ""
// console.log(minhaConta.saldo)
// // minhaConta.saldo = "duzentos"
// minhaConta.sacar(1000, "admin")
// minhaConta.saldo = 100
// minhaConta.saldo -= 1000

// console.log(minhaConta.saldo)
// minhaConta.extrato("admin")

const Pedro = new Pessoa("Pedro", '000.000.001-91', 23)
const conta_pedro = new Conta(Pedro, 12345678)
console.log(conta_pedro.saldo)
console.log(conta_pedro.dono)
conta_pedro.depositar(10, 12345678)
console.log(conta_pedro.saldo)

const Joao = new Pessoa("joao", '000.000.001-91', 22)
const conta_joao = new Conta(Joao, 1223)
conta_joao.depositar(10, 1223)
console.log(conta_joao.saldo)

BancoCentral.transferir_valor(conta_pedro, conta_joao, -10, 12345678)
console.log(conta_pedro.saldo)
console.log(conta_joao.saldo)

BancoCentral.transferir_valor(conta_pedro, conta_joao, 10, 12345678)
