const users = [
    {id: 1, nome: 'rodrigo', email: 'rodrigo@rodrigo', senha: '123', admin: 'sim', favorito: 'null'}
];

class UsersController {
    async cadastrar(req, res) {
        const user = req.body;
        users.push(user);

        const { email } = req.body;
        const usuarioEcontrado = users.find(u => u.email == email);

        req.session.user = usuarioEcontrado;
        return res.redirect('/');

    }

    async login(req, res) {

        const { email, senha } = req.body;
        const usuarioEcontrado = users.find(u => u.email == email);

        if (!usuarioEcontrado) return res.send('User nao encontrado <a href="/">Voltar</a>');

        if (usuarioEcontrado.senha == senha) {
            req.session.user = usuarioEcontrado;
            return res.redirect('/');
        } else {
            return res.send('Senha incorreta <a href="/">Voltar</a>');
        }
        
    }

    async mostraLogin(req, res) {
        return res.render('login', {user : undefined});
    }

    async mostraCadastro(req, res) {

        return res.render('cadastro_usuario', {user : undefined});
    }

    async favoritar(req, res) {
        const {nome}  = req.params;
        const  usuario  = req.session.user.nome;

        users.map((user)=>{
            if(user.nome == usuario) {
                user.favorito = nome;
                req.session.user.favorito = nome;
            }
        });
        return res.redirect('/');
    }

    async desfavoritar(req, res) {
        const  usuario  = req.session.user.nome;

        users.map((user)=>{
            if(user.nome == usuario) {
                user.favorito = 'null';
                req.session.user.favorito = 'null';
            }
        });
        return res.redirect('/');
    }

    async logout(req, res) {
        req.session.destroy();

        return res.redirect('/');
    }

    async perfil(req, res) {
        return res.render('perfil', {user : req.session.user});
    }
}

module.exports = UsersController; 