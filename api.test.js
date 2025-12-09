const request = require('supertest');
const app = require('./index');
const db = require('./conexao');
const cenarios = [
    {
        tabela: 'produto',
        nome: 'Produtos',
        dados: { descricao: 'Óculos da Tilibins', tipo: 'Armação do naruto', preco: 100, estoque_atual: 10 },
        novosDados: { descricao: 'Óculos da Rayban', preco: 200 },
        campoVerificacao: 'descricao', // Qual campo vamos olhar pra ver se salvou?
        valorEsperadoAtualizacao: 'Óculos da Rayban'
    },
    {
        tabela: 'cliente',
        nome: 'Clientes',
        dados: { nome: 'Leo Barrigas', cpf: '12345678900', email: 'amantedemelancias@gmail.com' },
        novosDados: { nome: 'Ingao Mestre Das Conclusoes' },
        campoVerificacao: 'nome',
        valorEsperadoAtualizacao: 'Ingao Mestre Das Conclusoes'
    },
    {
        tabela: 'usuario',
        nome: 'Usuários',
        dados: { nome: 'Rôrô Saliente', login: 'user.test', senha: 'flamengo123', perfil: 'Admin' },
        novosDados: { nome: 'Otinha Querubin' },
        campoVerificacao: 'nome',
        valorEsperadoAtualizacao: 'Otinha Querubin'
    }
];
// Apaga todos os dados antes de cada teste
async function limparBanco() {
    const tabelas = ['pagamento', 'venda', 'item_os', 'ordem_servico', 'receita_oftalmologica', 'produto', 'cliente', 'usuario'];
    const connection = await db.getConnection();
    await connection.query('SET FOREIGN_KEY_CHECKS = 0'); // desliga o krl das FK
    for (const t of tabelas) await connection.query(`TRUNCATE TABLE ${t}`); // zera a tabela e o ID
    await connection.query('SET FOREIGN_KEY_CHECKS = 1'); // religa as FK
    connection.release();
}
describe('Testes Integração', () => {
    //limpa tudo.
    beforeEach(async () => {
        await limparBanco();
    });
    // encerra a conexão com o bd
    afterAll(async () => {
        await db.end();
    });
    // Os testes seguem a mesma estrutura, cria os dados necessarios, faz a requisição e confere o retorno
    describe('Testes de CRUD', () => {
        // Cria um bloco de teste para cada item da lista "cenarios"
        cenarios.forEach((item) => {
            describe(`Tabela: ${item.nome}`, () => {
                test(`POST - Criar novo registro em ${item.tabela}`, async () => {
                    const res = await request(app)
                        .post(`/${item.tabela}`)
                        .send(item.dados);
                    expect(res.status).toBe(201);
                    expect(res.body.id).toBe(1);
                });
                test(`PUT - Atualizar registro em ${item.tabela}`, async () => {
                    // Cria primeiro
                    await request(app).post(`/${item.tabela}`).send(item.dados);
                    // Atualiza
                    const res = await request(app)
                        .put(`/${item.tabela}/1`)
                        .send(item.novosDados);
                    expect(res.status).toBe(200);
                    // Verifica no banco se mudou
                    const resGet = await request(app).get(`/${item.tabela}/1`);
                    expect(resGet.body[item.campoVerificacao]).toBe(item.valorEsperadoAtualizacao);
                });

                test(`DELETE - Remover registro de ${item.tabela}`, async () => {
                    await request(app).post(`/${item.tabela}`).send(item.dados);
                    const res = await request(app).delete(`/${item.tabela}/1`);
                    expect(res.status).toBe(200);
                    const resGet = await request(app).get(`/${item.tabela}/1`); // Verifica se sumiu
                    expect(resGet.status).toBe(404);
                });

            });
        });
    });

    describe('Testes de Consulta', () => {
        cenarios.forEach((item) => {
            describe(`Leitura em: ${item.nome}`, () => {
                test(`GET /${item.tabela} - Deve Listar todos os registros`, async () => {
                    await request(app).post(`/${item.tabela}`).send(item.dados);
                    const res = await request(app).get(`/${item.tabela}`);
                    expect(res.status).toBe(200);
                    expect(res.body.length).toBeGreaterThan(0);
                    expect(res.body[0][item.campoVerificacao]).toBe(item.dados[item.campoVerificacao]);
                });
                test(`GET /${item.tabela}/:id - Buscar registro específico`, async () => {
                    await request(app).post(`/${item.tabela}`).send(item.dados);
                    const res = await request(app).get(`/${item.tabela}/1`);
                    expect(res.status).toBe(200);
                    expect(res.body).toHaveProperty(item.campoVerificacao);
                });
                test(`GET /${item.tabela}/999 - Deve retornar 404 se não existir`, async () => {
                    const res = await request(app).get(`/${item.tabela}/999`);
                    expect(res.status).toBe(404);
                });

            });
        });
    });
    describe('Fluxo Completo: Cliente -> OS -> Venda -> Pagamento', () => {
        
        test('Realizar o ciclo completo de uma ótica', async () => {
            // Criação
            const user = await request(app).post('/usuario').send({ nome: 'Rôrô', login: 'rr', senha: 'flamengo123', perfil: 'Vendas' });
            const cliente = await request(app).post('/cliente').send({ nome: 'Rhani', cpf: '123.456.789-10', email: 'usainbolt@gmail.com' });
            const produto = await request(app).post('/produto').send({ descricao: 'Lente com sharingan', tipo: 'L', preco: 100, estoque_atual: 10 });

            const idUser = user.body.id;
            const idCliente = cliente.body.id;
            const idProd = produto.body.id;
            // cria uma receita
            const receita = await request(app).post('/receita_oftalmologica').send({
                id_cliente: idCliente,
                data_receita: '2025-10-10',
                oe_esferico: '-2.00',
                observacoes: 'Amaterasu'
            });
            expect(receita.status).toBe(201);
            const idReceita = receita.body.id;
            // cria uma ordem de serviço
            const os = await request(app).post('/ordem_servico').send({
                id_cliente: idCliente,
                id_usuario_abertura: idUser,
                id_receita: idReceita,
                status: 'Aberta',
                valor_total: 200.00
            });
            expect(os.status).toBe(201);
            const idOS = os.body.id;
            //  ADD um item na OS 
            const item = await request(app).post('/item_os').send({
                id_os: idOS,
                id_produto: idProd,
                quantidade: 2,
                preco_unitario_venda: 100.00
            });
            expect(item.status).toBe(201);
            // transforma em venda 
            const venda = await request(app).post('/venda').send({
                id_os: idOS,
                id_usuario_fechamento: idUser,
                valor_final: 200.00
            });
            expect(venda.status).toBe(201);
            const idVenda = venda.body.id;
            // realizar pagamento 
            const pag = await request(app).post('/pagamento').send({
                id_venda: idVenda,
                tipo_pagamento: 'Tiquete refeição',
                valor: 200.00
            });
            expect(pag.status).toBe(201);
        });
    });

    describe('Testes de Erro', () => {
        test('GET 404 - Retornar erro ao buscar ID inexistente', async () => {
            const res = await request(app).get('/usuario/9999');
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Registro não encontrado');
        });
        test('FK ERROR - Não deve criar Venda se a OS não existir', async () => {
            // tenta criar uma venda para a OS número 999 
            const res = await request(app).post('/venda').send({
                id_os: 999, 
                id_usuario_fechamento: 1,
                valor_final: 50.00
            });
            // O MySQL vai recusar a API, retornarnando 500
            expect(res.status).toBe(500);
            expect(res.body.error).toMatch(/Foreign key constraint fails/i); // Verifica se a mensagem de erro é de chave estrangeira
        });
        test('DELETE ERROR - Não apagar Cliente se ele tem Receita vinculada', async () => {
            // Cria uma cliente e receita
            const cliente = await request(app).post('/cliente').send({ nome: 'Mary', cpf: '100.200.300-40', email: 'maiorperdedorano2ou1@gmail.com' });
            await request(app).post('/receita_oftalmologica').send({ id_cliente: cliente.body.id, data_receita: '2003-05-10' });
            // Tenta apagar a cliente
            const res = await request(app).delete(`/cliente/${cliente.body.id}`);
            // tem que falhar pois existe uma receita dependendo dela
            expect(res.status).toBe(500);
            expect(res.body.error).toMatch(/Foreign key constraint fails/i);
        });
    });
    describe('Restrições de Unicidade', () => {
        test('Não permitir dois usuários com o mesmo login', async () => {
            // cria o primeiro usuário
            await request(app).post('/usuario').send({
                nome: 'Otinha', login: 'unico.login', senha: '123', perfil: 'Admin'
            });
            // tenta criar o segundo igual
            const res = await request(app).post('/usuario').send({
                nome: 'Leo Barrigas', login: 'unico.login', senha: '999', perfil: 'User'
            });
            // Esperado: Erro 500
            expect(res.status).toBe(500);
            // Vê se a mensagem de erro contém "Duplicate entry"
            expect(res.body.error).toMatch(/Duplicate entry/i);
        });
        test('Não permitir dois clientes com o mesmo CPF', async () => {
            await request(app).post('/cliente').send({ nome: 'Ingao', cpf: '111.111.111-00', email: 'euodeiosla@gmail.com' });
            const res = await request(app).post('/cliente').send({ 
                nome: 'Pitu ladrão de cpf', cpf: '111.111.111-00', email: 'cademeucigarrin@gmail.com' 
            });
            expect(res.status).toBe(500);
            expect(res.body.error).toMatch(/Duplicate entry/i);
        });
        test('Não permitir duas vendas para a mesma Ordem de Serviço', async () => {
            const user = await request(app).post('/usuario').send({ 
                nome: 'Mary', login: 'caixa.uniq', senha: 'loloedrogadepobre', perfil: 'Caixa' 
            });
            const idUser = user.body.id;
            const cli = await request(app).post('/cliente').send({ 
                nome: 'Bruno lanches', cpf: '999.888.777-66', email: 'xbreno@gmail.com' 
            });
            const idCli = cli.body.id;
            const rec = await request(app).post('/receita_oftalmologica').send({
                id_cliente: idCli,
                data_receita: '2025-05-20',
                observacoes: 'Teste Unicidade'
            });
            const idRec = rec.body.id;
            const os = await request(app).post('/ordem_servico').send({
                id_cliente: idCli,
                id_usuario_abertura: idUser,
                id_receita: idRec,
                status: 'Aberta'
            });
            const idOS = os.body.id;

            const primeiraVenda = await request(app).post('/venda').send({
                id_os: idOS,
                id_usuario_fechamento: idUser,
                valor_final: 150.00
            });
            expect(primeiraVenda.status).toBe(201); 
            //  Tentar criar a SEGUNDA venda para a MESMA OS
            const segundaVenda = await request(app).post('/venda').send({
                id_os: idOS, //  O mesmo ID da OS anterior
                id_usuario_fechamento: idUser,
                valor_final: 200.00
            });
            // Verificação
            expect(segundaVenda.status).toBe(500);
            expect(segundaVenda.body.error).toMatch(/Duplicate entry/i);
        });
    });
    describe('Validação de Tipos de Dados', () => {
        test('Não deve aceitar texto no campo de preço', async () => {
            const res = await request(app).post('/produto').send({
                descricao: 'Produto Bugado',
                tipo: 'Sempre culpa do usuario',
                preco: 'cem reais',
                estoque_atual: 10
            });
            expect(res.status).toBe(500);
            // O MySQL tem que reclamar soltando um "Incorrect decimal value" ou "Truncated"
            expect(res.body.error).toMatch(/Incorrect|Truncated|Warning/i); 
        });

        test('Não deve aceitar data inválida', async () => {
            const cli = await request(app).post('/cliente').send({ nome: 'X', cpf: '999', email: 'x@x.com'});
            const res = await request(app).post('/receita_oftalmologica').send({
                id_cliente: cli.body.id,
                data_receita: 'data-que-nao-existe', 
                observacoes: 'Teste'
            });
            expect(res.status).toBe(500);
            expect(res.body.error).toMatch(/Incorrect date value/i);
        });
        test('Não deve aceitar login maior que 50 caracteres (Data too long)', async () => {
            // Gera uma string com 51 letras 'a'
            const loginGigante = 'a'.repeat(51); 
            const res = await request(app).post('/usuario').send({
                nome: 'Usuario Longo',
                login: loginGigante, 
                senha: '123',
                perfil: 'Admin'
            });
            expect(res.status).toBe(500);
            expect(res.body.error).toMatch(/Data too long/i);
        });
    });
    describe('Campos Obrigatórios (NOT NULL)', () => {
        test('Não deve criar Usuario sem senha', async () => {
            const res = await request(app).post('/usuario').send({
                nome: 'Teste sao legais',
                login: 'Sou contra a frontendização',
                perfil: 'Admin'
                // Faltou o campo "senha"
            });
            expect(res.status).toBe(500);
            // O erro geralmente diz "Field 'senha' doesn't have a default value" ou "Column 'senha' cannot be null"
            expect(res.body.error).toMatch(/cannot be null|doesn't have a default/i);
        });
        test('Não deve criar Produto sem descrição e preço', async () => {
            const res = await request(app).post('/produto').send({
                tipo: 'Correntinha pra idoso',
                estoque_atual: 10
                // Faltou "descricao" e "preco"
            });
            expect(res.status).toBe(500);
            // O MySQL vai reclamar do primeiro campo que ele notar faltando
            expect(res.body.error).toMatch(/doesn't have a default|cannot be null/i);
        });
        test('Não deve criar Cliente sem Nome e CPF', async () => {
            const res = await request(app).post('/cliente').send({
                email: 'enzowederweu@gmail.com',
                telefone: '1199999999'
                // Faltou "nome" e "cpf"
            });
            expect(res.status).toBe(500);
            expect(res.body.error).toMatch(/doesn't have a default|cannot be null/i);
        });
    });


    describe('Segurança, SQL Injection', () => {
        test('Tratar tentativas de SQL Injection como texto comum', async () => {
            const ataque = "'; DROP TABLE usuario; --";
            // Tentamos criar um usuário com esse nome perigoso
            const res = await request(app).post('/usuario').send({
                nome: ataque,
                login: 'gilHacker',
                senha: 'sucoDeUva123',
                perfil: 'Hacker'
            });
            // A API vai aceitar (201), e salvar o nome como texto, não deletando a tabela
            expect(res.status).toBe(201);
            // Busca no banco e vê se o nome é exatamente o texto do ataque
            const [rows] = await db.query('SELECT * FROM usuario WHERE login = ?', ['gilHacker']);
            expect(rows[0].nome).toBe(ataque); // Salvou o texto, não executou o comando
            // Verifica se a tabela ainda existe
            const [check] = await db.query("SHOW TABLES LIKE 'usuario'");
            expect(check.length).toBe(1);
        });
    });
});
