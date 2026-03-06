const express = require('express');
const db = require('./conexao'); 
const bcrypt = require('bcrypt'); // 1. Garanta que o bcrypt está no topo
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// dic para mapear a tabela e suas cheves primarias
const tabelaMap = {
    'usuario': 'id_usuario',
    'cliente': 'id_cliente',
    'produto': 'id_produto',
    'receita_oftalmologica': 'id_receita',
    'ordem_servico': 'id_os',
    'item_os': 'id_item_os',
    'venda': 'id_venda',
    'vw_vendas_detalhadas': 'id_venda',
    'pagamento': 'id_pagamento'
};

// --- ROTA DE LOGIN (DEVE VIR ANTES DAS ROTAS GENÉRICAS) ---
app.post('/login', async (req, res) => {
    const { cpf, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM usuario WHERE cpf = ?', [cpf]);
        
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        const usuario = rows[0];
        
        // Compara a senha digitada com o hash do banco
        const senhaValida = await bcrypt.compare(password, usuario.senha);
        if (!senhaValida) return res.status(401).json({ error: 'Senha incorreta.' });

        res.json({ user: { nome: usuario.nome, perfil: usuario.perfil } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Middleware de validação (para rotas genéricas)
function validarTabela(req, res, next) {
    const tabela = req.params.tabela.toLowerCase();
    if (!tabelaMap[tabela]) {
        return res.status(400).json({ error: 'Tabela inválida.' });
    }
    req.chavePrimaria = tabelaMap[tabela];
    next();
}

// --- ROTAS GENÉRICAS (GET, POST, PUT, DELETE) ---
// Certifique-se de NÃO ter um app.post('/:tabela') repetido abaixo deste
app.post('/:tabela', validarTabela, async (req, res) => {
    const tabela = req.params.tabela.toLowerCase(); 
    const dados = req.body;

    if (tabela === 'usuario' && dados.senha) {
        const saltRounds = 10;
        dados.senha = await bcrypt.hash(dados.senha, saltRounds);
    }

    const colunas = Object.keys(dados);
    const valores = Object.values(dados);
    const placeholders = colunas.map(() => '?').join(', ');

    try {
        const sql = `INSERT INTO ?? (${colunas.join(', ')}) VALUES (${placeholders})`; 
        const [result] = await db.query(sql, [tabela, ...valores]);
        res.status(201).json({ message: 'Criado com sucesso', id: result.insertId});
    } catch(error) {
        res.status(500).json({ error: error.message }); 
    }
});


// Cunsulta de todos os dados na tabela
app.get('/:tabela', validarTabela, async (req, res) => {
    const tabela = req.params.tabela; 
    try {
        const [rows] = await db.query(`SELECT * FROM ??`, [tabela]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/:tabela/:id', validarTabela, async (req, res) => {
    // Essas variaveis substituem as '?' no comando, os '?' servem pra evitar sql inject 
    const tabela = req.params.tabela;
    const id = req.params.id;
    const pk = req.chavePrimaria;

    try {
        const [rows] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`, [tabela, pk, id]); // aqui um exemplo
        if (rows.length === 0) return res.status(404).json({ message: 'Registro não encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/:tabela', validarTabela, async (req, res) => {
    const tabela = req.params.tabela;
    const dados = req.body; // puxa todos os atributos

    const colunas = Object.keys(dados);
    const valores = Object.values(dados);
    
    const placeholders = colunas.map(() => '?').join(', '); // Isso aqui é pra inserir a quantidade de '?' igual o numero de atributos

    if(colunas.length === 0) return res.status(400).json({error: 'Nenhum dado enviado.'});

    try{
        const sql = `INSERT INTO ?? (${colunas.join(', ')}) VALUES (${placeholders})`; // bem aqui
        const [result] = await db.query(sql, [tabela, ...valores]);
        res.status(201).json({ message: 'Criado com sucesso', id: result.insertId});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao inserir: ' + error.message}); 
    }
});

app.put('/:tabela/:id', validarTabela, async (req, res) => {
    const tabela = req.params.tabela;
    const id = req.params.id;
    const pk = req.chavePrimaria;
    const dados = req.body;
    
    const colunas = Object.keys(dados);
    const valores = Object.values(dados);

    if (colunas.length === 0) return res.status(400).json({ error: 'Nenhum dado para atualizar' });
    
    const setClause = colunas.map(col => `${col} = ?`).join(', '); // pega os atribustos no arquivo e seus novos valores e formata p/ sql
    
    try{
        const sql = `UPDATE ?? SET ${setClause} WHERE ?? = ?`;
        const [result] = await db.query(sql, [tabela, ...valores, pk, id]);
        
        if(result.affectedRows === 0) return res.status(404).json({ message: 'Registro não encontrado' });
        res.json({ message: 'Atualizado com sucesso'});
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar: ' + error.message});
    }
});

app.delete('/:tabela/:id', validarTabela, async (req, res) => {
    const tabela = req.params.tabela;
    const id = req.params.id;
    const pk = req.chavePrimaria;
    
    try {
        const [result] = await db.query(`DELETE FROM ?? WHERE ?? = ?`, [tabela, pk, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Registro não encontrado' });
        res.json({ message: 'Removido com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// servidor on fire mlk 
module.exports = app; // Exportamos o app para os testes usarem
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}