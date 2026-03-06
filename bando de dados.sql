USE oticafocal;

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) NOT NULL 
);

CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(150) NOT NULL,
    tipo VARCHAR(50),
    preco DECIMAL(10, 2) NOT NULL,
    estoque_atual INT DEFAULT 0
);

CREATE TABLE Receita_Oftalmologica (
    id_receita INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_receita DATE NOT NULL,
    oe_esferico VARCHAR(10),
    od_esferico VARCHAR(10),
    adicao VARCHAR(10),
    observacoes TEXT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente)
);

CREATE TABLE Ordem_Servico (
    id_os INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_usuario_abertura INT NOT NULL, 
    id_receita INT, 
    data_abertura DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'Aberta', 
    valor_total DECIMAL(10, 2),
    valor_entrada DECIMAL(10, 2),
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_usuario_abertura) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_receita) REFERENCES Receita_Oftalmologica(id_receita)
);

CREATE TABLE Item_OS (
    id_item_os INT AUTO_INCREMENT PRIMARY KEY,
    id_os INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 1,
    preco_unitario_venda DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_os) REFERENCES Ordem_Servico(id_os) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);

CREATE TABLE Venda (
    id_venda INT AUTO_INCREMENT PRIMARY KEY,
    id_os INT NOT NULL UNIQUE, 
    id_usuario_fechamento INT NOT NULL, 
    data_venda DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_final DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_os) REFERENCES Ordem_Servico(id_os),
    FOREIGN KEY (id_usuario_fechamento) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_venda INT NOT NULL,
    data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_pagamento VARCHAR(50) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_venda) REFERENCES Venda(id_venda)
);

ALTER TABLE Cliente ADD COLUMN Genero VARCHAR(100);
ALTER TABLE Cliente ADD COLUMN DataNasc DATE;
ALTER TABLE Cliente ADD COLUMN endereco VARCHAR(100);
ALTER TABLE Cliente ADD COLUMN rua VARCHAR(100);
ALTER TABLE Cliente ADD COLUMN numero INT;
ALTER TABLE Cliente ADD COLUMN Bairro VARCHAR(50);
ALTER TABLE Cliente ADD COLUMN Complemento VARCHAR(100);
ALTER TABLE Cliente ADD COLUMN Cidade VARCHAR(100);
ALTER TABLE Cliente ADD COLUMN Estado VARCHAR(2);
ALTER TABLE CLiente ADD COLUMN CEP VARCHAR(8);

ALTER TABLE Produto ADD COLUMN Categoria VARCHAR(50);
ALTER TABLE Produto ADD COLUMN Marca VARCHAR(50);
ALTER TABLE Produto ADD COLUMN Fornecedor VARCHAR(50);
ALTER TABLE Produto ADD COLUMN Referencia VARCHAR(20);
ALTER TABLE Produto ADD COLUMN Preco_custo DECIMAL(10, 2) NOT NULL;

ALTER TABLE Ordem_Servico ADD COLUMN data_entrega DATE;
ALTER TABLE Ordem_Servico ADD COLUMN id_produto INT;
ALTER TABLE Ordem_Servico ADD COLUMN observacao VARCHAR(200);

ALTER TABLE Ordem_Servico 
ADD CONSTRAINT fk_produto 
FOREIGN KEY (id_produto) 
REFERENCES Produto(id_produto);


SELECT * FROM Ordem_Servico;
SELECT * FROM Usuario;

DELETE FROM Cliente WHERE id_cliente = 9;


ALTER TABLE Produto DROP COLUMN tipo;
CREATE VIEW vw_ordem_servico AS
SELECT 
    os.*, 
    c.nome AS nome_cliente,
    c.cpf AS cpf_cliente
FROM Ordem_Servico os
LEFT JOIN Cliente c ON os.id_cliente = c.id_cliente;

INSERT INTO Usuario VALUES (2,'Leo_Bahia','1','2','3');

INSERT INTO Usuario VALUES (3,'igao','4','5','6');