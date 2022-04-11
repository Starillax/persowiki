let personagens = [
    {id: 'tflc-7YM', nome:'Homem-Aranha (Peter Parker)', idade: 21, genero: 'Masculino', status: 'Vivo', origem: 'Marvel Comics', criador: 'Stan Lee, Steve Ditko', descricao: 'Peter Parker perdeu seus pais, Richard e Mary Parker, quando era jovem. Órfão, ele teve que viver com seu Tio Ben e sua Tia May. Durante uma exposição de ciência, ele foi mordido por uma Aranha Radioativa, concedendo-lhe seus poderes. Ele decidiu usar esses poderes para seu próprio ganho egoísta, até que seu tio Ben morreu nas mãos de um Ladrão que ele poderia ter impedido. Foi nesse ponto que ele aprendeu "Com grandes poderes, também deve haver grandes responsabilidades", e decidiu viver de acordo com o mantra de seu tio e usar seus poderes como uma força para o bem como Homem-Aranha.', data: '1962-06-05', url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png'},
    {id: 'O3Z1LryS', nome: 'Homem de Ferro (Tony Stark)', idade: 52, genero: 'Masculino', status: 'Vivo', origem: 'Marvel Comics', criador: 'Stan Lee, Larry Lieber, Don Heck, Jack Kirby', descricao: 'Tony Stark é um inventor genial e industrial bilionário, que veste sua armadura de tecnologia de ponta para se tornar o super-herói Homem de Ferro. O filho adotivo do fabricante de armas Howard Stark, Tony herdou a empresa de sua família ainda jovem após a morte de seus pais. Enquanto supervisionava uma fábrica em um país estrangeiro, Stark foi sequestrado por terroristas locais. Em vez de ceder às demandas de seus captores para construir armas para eles, Stark criou uma poderosa armadura para ele escapar. Voltando para a América, Stark melhorou ainda mais a armadura e colocou seus vastos recursos e intelecto para usar para a melhoria do mundo como Homem de Ferro.', data: '1962-12-10', url: 'https://media.wired.com/photos/59344c46bef1fc4e58f92253/master/pass/im_large_660.jpg'},
    {id: 'dPdCxuoj', nome: 'Monkey D. Luffy', idade: 19, genero: 'Masculino', status: 'Vivo', origem: 'Shounen Jump', criador: 'Eiichiro Oda', descricao: 'Monkey D. Luffy, também conhecido como Chapéu de Palha, é um pirata e o protagonista do anime e mangá One Piece. Ele é o fundador e o capitão do cada vez mais infame e poderoso Piratas do Chapéu de Palha, bem como um de seus principais lutadores. Seu sonho de vida é se tornar o Rei dos Piratas, encontrando o lendário tesouro deixado pelo falecido Rei dos Piratas, Gol D. Roger. Nascido na Vila Foosha, Luffy acidentalmente comeu a Gomu Gomu no Mi aos 7 anos de idade, que deu ao seu corpo propriedades de borracha.', data: '1996-08-04', url: 'https://upload.wikimedia.org/wikipedia/pt/thumb/f/fd/Opluffy.png/230px-Opluffy.png'}
];

const { nanoid } = require('nanoid');

class PersonagensController {

    async mostraCadastro(req, res) {
        return res.render('formPersonagem',{ user: req.session.user, tipo: 'cadastro'});
    }

    async listar(req, res) {
        let array = personagens.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
        
        return res.render('listagem', { user: req.session.user, personagens: array });
    }

    async mostrarEditar(req, res) {
        const { id } = req.params;

        const personagemIdx = personagens.filter(f => f.id == id);
        if(personagemIdx[0] != undefined) {
            return res.render('formPersonagem', { user: req.session.user, personagem: personagemIdx[0], tipo:'edit' });
        }else {
            return res.send('Personagem não encontrado! <br> <a href="/">Voltar</a>');
        }
    }

    async editar(req, res) {

        personagens.map((personagem)=>{
            if(personagem.id == req.body.id) {
                personagem.nome = req.body.nome;
                personagem.idade = req.body.idade;
                personagem.genero = req.body.genero;
                personagem.status = req.body.status;
                personagem.origem = req.body.origem;
                personagem.criador = req.body.criador;
                personagem.descricao = req.body.descricao;
                personagem.data = req.body.data;
                personagem.url = req.body.url;
            }
        });

        res.render('listagem', { user: req.session.user, personagens: personagens });
    }

    async excluir(req, res) {
        const { id } = req.params;

        const personagemIdx = personagens.findIndex(f => f.id == id);

        if(personagemIdx != undefined) {
            personagens.splice(personagemIdx, 1);
        }else {
            return res.send('Personagem não encontrado! <br> <a href="/">Voltar</a>');
        }

        res.redirect('/personagens');
    }

    async detalhar(req, res) {
        const { id } = req.params;

        const personagemFiltrado = personagens.filter(f => f.id == id);
        if (personagemFiltrado.length > 0) {
            return res.render('detalhar', { user: req.session.user, personagem: personagemFiltrado[0] });
        } else {
            return res.send('Personagem não encontrado! <br> <a href="/">Voltar</a>');
        }
    }

    async cadastrar(req, res) {
        personagens.push({
            id: nanoid(8),
            ...req.body
        });
        return res.redirect('/personagens');
    }

    async filtrar(req, res) {
        const { campo } = req.params;

        if (campo == "nome+asc") {
            let array = personagens.sort((a,b) => (a.nome.toLocaleLowerCase() > b.nome.toLocaleLowerCase()) ? 1 : ((b.nome.toLocaleLowerCase() > a.nome.toLocaleLowerCase()) ? -1 : 0));

            res.render('listagem',  { user: req.session.user, personagens: array});
        } else if (campo == "nome+desc") {
            let array = personagens.sort((a,b) => (a.nome.toLocaleLowerCase() < b.nome.toLocaleLowerCase()) ? 1 : ((b.nome.toLocaleLowerCase() < a.nome.toLocaleLowerCase()) ? -1 : 0));

            res.render('listagem',  { user: req.session.user, personagens: array});
        } else if (campo == "origem+asc") {
            let array = personagens.sort((a,b) => (a.origem.toLocaleLowerCase() > b.origem.toLocaleLowerCase()) ? 1 : ((b.origem.toLocaleLowerCase() > a.origem.toLocaleLowerCase()) ? -1 : 0));

            res.render('listagem',  { user: req.session.user, personagens: array});
        } else if (campo == "origem+desc") {
            let array = personagens.sort((a,b) => (a.origem.toLocaleLowerCase() < b.origem.toLocaleLowerCase()) ? 1 : ((b.origem.toLocaleLowerCase() < a.origem.toLocaleLowerCase()) ? -1 : 0));

            res.render('listagem',  { user: req.session.user, personagens: array});
        } else if (campo == "data+asc") {
            let array = personagens.sort((a,b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0));

            res.render('listagem',  { user: req.session.user, personagens: array});
        } else if (campo == "data+desc") {
            let array = personagens.sort((a,b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0));

            res.render('listagem',  { user: req.session.user, personagens: array});
        }
    }

}

module.exports = { PersonagensController }