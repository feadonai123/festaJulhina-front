const DEFAULT_IMAGE = "http://localhost:1234/public/images/default.png"

export default class Validate {

	static name (data) {
		if(!data) return { error: true, message: "Campo obrigatório" }
		if (typeof data != 'string') return { error: true, message: "Nome inválido" }
		if(data.length < 3 ) return { error: true, message: "Nome precisa ser maior que 3 caracteres" }
		/*const
			parts = data.trim(' ').split(' '),
			menorNome = parts.map(part => part.length).sort((a, b) => a - b)[0]
		if(parts.length <= 1 || menorNome <= 1) return { error: true, message: "O nome precisa ter mais de uma palavra"}*/
		return { error: false }
	}

	static description(data){
		if(!data) return { error: true, message: "Campo obrigatório" }
		if (typeof data != 'string') return { error: true, message: "Descrição inválida" }
		if(data.length > 100) return { error: true, message: "Limite máximo de 100 caracteres exedida" }
		if(data.length < 10) return { error: true, message: "Limite mínimo de 10 caracteres não foi atingida" }
		return { error: false}
	}

	static value(data){
		if(!data) return { error: true, message: "Campo obrigatório" }
		if(isNaN(data)) return { error: true, message: "Valor inválido" }
		if(data <= 0) return { error: true, message: "Valor precisa ser maior que zero" }
		return { error: false }
	}

	static image(data){
		if(!data || data == DEFAULT_IMAGE) return { error: true, message: "Campo obrigatório"}
		return { error: false }
	}

	static select(data){
		if(!data || data == "-1") return { error: true, message: "Campo obrigatório"}
		return { error: false }
	}







	static email (email) {
		if (!email || typeof email != 'string') return false
		return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-.]+)*$/g.test(email)
	}

	static phone (phone) {
		if (!phone || typeof phone != 'string') return false
		return /^[0-9]{11}$/g.test(phone.replace(/\D/g, ''))
	}

	static rg (documento) {
		if (!documento || typeof documento != 'string') return false
		return /^[0-9]{6,12}$/g.test(documento.replace(/\D/g, ''))
	}

	static nome (nome) {
		if (!nome || typeof nome != 'string') return false
		const
			parts = nome.trim(' ').split(' '),
			menorNome = parts.map(part => part.length).sort((a, b) => a - b)[0]
		return parts.length > 1 && menorNome > 1
	}

	static cpf (cpf) {
		if (!cpf || typeof cpf != 'string' || cpf == "00000000000") return false
		let soma = 0, resto

		for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
		resto = (soma * 10) % 11

		if ((resto == 10) || (resto == 11)) resto = 0
		if (resto != parseInt(cpf.substring(9, 10))) return false

		soma = 0
		for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
		resto = (soma * 10) % 11

		if ((resto == 10) || (resto == 11)) resto = 0
		if (resto != parseInt(cpf.substring(10, 11))) return false

		return true
	}

	static cep (cep) {
		if (!cep || typeof cep != 'string') return false
		return /^[0-9]{8}$/g.test(cep.replace(/\D/g, ''))
	}

	static numeroCartao (number) {
		if (!number || typeof number != 'string') return false
		return number.replace(/[^\d]/g, "")
	}

	static expMonth (expMonth) {
		if (!expMonth || typeof expMonth != 'string') return false
		if (parseInt(expMonth) > 12 || parseInt(expMonth) < 1) return false
		return expMonth.replace(/[^\d]/g, "")
	}

	static expYear (expYear) {
		if (!expYear || typeof expYear != 'string') return false
		return expYear.replace(/[^\d]/g, "")
	}

	static securityCode (securityCode) {
		if (!securityCode || typeof securityCode != 'string') return false
		if (securityCode.length < 3) return false
		return securityCode.replace(/[^\d]/g, "")
	}

}