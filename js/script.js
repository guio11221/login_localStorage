class Contato {
	constructor() { // campos que seram usado para salvar as info
		let nome;
		let email;
		let senha;
		let telefone;
	}
}

const banco = "InfoUser" // nome do banco de dados
function salvarInfoo(nome, email, senha, telefone) { // essa função ira salvar o user no banco de dados 

	if (!nome || !email || !senha || !telefone) { // verificar se os dados foram enviados diferente de null 'vaziu'

		// caso seja vindo algum campo vaziu, ele retorna uma mensagem para o user 
		return Swal.fire({
			icon: 'error',
			title: 'Dados invalidos, precisa preencher todos os campos..!!',
			showConfirmButton: false,
			timer: 1500
		})

	} else

		var vetor = []

	let agenda = new Contato()
	agenda.nome = nome;
	agenda.email = email;
	agenda.senha = senha;
	agenda.telefone = telefone;

	if (localStorage.getItem(banco) == null) { // se não tiver nenhum dado no banco 
		vetor.push(agenda) // sesra salvo os dados em uma array
		localStorage.setItem(banco, JSON.stringify(vetor)) // salvando no localStorage os dados 
	} else {
		// se não esstiver vaziu os dados, ele apenas vai salvar os dados 
		vetor = JSON.parse(localStorage.getItem(banco))
		vetor.push(agenda)
		localStorage.setItem(banco, JSON.stringify(vetor))
	}

	// se ocorrer tudo bem, essa mensage sera retornada para o user falando que foi salva com sucesso
	// o user no localStorage
	return Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-primary mr-2',
			cancelButton: 'btn btn-secondary'
		},
		buttonsStyling: false
	}).fire({
		icon: 'success',
		title: `User ${nome}, salvo com sucesso..!!`,
		showConfirmButton: true,
		confirmButtonText: 'OK',
		showCancelButton: true,
		cancelButtonText: 'Login',
	}).then((result) => {

		if (result.isDismissed) {
			window.location.href = 'login.html';
		}
	});
}

// a função de login 
function login(email, senha) {

	let vetor = []
	let achou = false

	// pega todos os user salvo no localStorage
	vetor = JSON.parse(localStorage.getItem(banco))

	for (var i = 0; i < vetor.length; i++) { // por no laço de repetição 

		if (!email || !senha) { // verificar se nenhum dado foi retornado vaziu
			return Swal.fire({
				position: 'top-end',
				icon: 'error',
				title: 'Preencha todos os campos',
				showConfirmButton: false,
				timer: 1500
			})
		} else// verificando se os dados que ele enviou existe no banco de dados
			if (email == vetor[i].email && senha == vetor[i].senha) {

				// se o login for correto, ele redireciona para a tela de perfil
				return window.location.href = "perfil.html"
			} else

				// se o login estiver incorreto, ele vai dar erro de login não encontrado.
				return Swal.mixin({
					customClass: {
						confirmButton: 'btn btn-primary mr-2',
						cancelButton: 'btn btn-secondary'
					},
					buttonsStyling: false
				}).fire({
					icon: 'error',
					title: 'Login incorreto',
					showConfirmButton: true,
					confirmButtonText: 'Tentar novamente',
					showCancelButton: true,
					cancelButtonText: 'Cadastre-se',
				}).then((result) => {

					if (result.isDismissed) {
						window.location.href = 'cadastro.html';
					}
				});
	}
}

// função de buscar o user salvo no localStorage
function buscaInfo(nome) {

	let vetor = [];
	let achou = false;
	vetor = JSON.parse(localStorage.getItem(banco));// pego os itens salvo
	for (i = 0; i < vetor.length; i++) { // jogo no laço para ver se existe e ver qual posição está.
		if (nome == vetor[i].nome) {
			achou = true;

			console.log(vetor[i])
			posicao = i;
		} else

			return console.log('User ' + nome + ' não encontrado')
	}
}




// buscaInfo("Guii Santos")
// salvarInfoo("Guii Santos", "Sguii5147@gmail.com", "123", "67998725601");