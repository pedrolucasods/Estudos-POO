class Conta {
    #senha = "admin"
    dono
    #saldo
    constructor() {
        this.#saldo = 0;
    }

    sacar(valorSaque, senha) {
        if(!this.validarSenha(senha))
        {
            console.log("Senha incorreta")
            return
        }
        if ((this.#saldo - valorSaque) >= 0) {
            this.#saldo -= valorSaque
        }else
            console.log("Saldo insuficiente")
    }

    extrato(senha)
    {
        if(!this.validarSenha(senha))
        {
            console.log("Senha incorreta")
            return
        }
        console.log(`Seu saldo é ${this.#saldo}`)
    }

    depositar(valor,senha)
    {
        if(!this.validarSenha(senha))
        {
            console.log("Senha incorreta")
            return
        }
        if(valor < 0){
            console.log("O valor depositado não pode ser negativo")
            return;
        }
        if(valor > 5000){
            console.log("Valor muito alto. Dirija-se ao caixa. Atendimento das 10:00h às 15:00hs")
            return;
        }
        this.#saldo += valor
    }

    validarSenha(senha)
    {
        return senha === this.#senha
    }
}

minhaConta = new Conta()
minhaConta.depositar(500, "admin")
minhaConta.saldo = 200
minhaConta.endereco = ""
// minhaConta.saldo = "duzentos"
minhaConta.sacar(1000, "admin")

minhaConta.saldo -= 1000

console.log(minhaConta.saldo)
minhaConta.extrato("admin")