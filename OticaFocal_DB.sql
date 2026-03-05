USE OticaFocal;

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

ALTER TABLE Produto ADD COLUMN Categoria VARCHAR(50);
ALTER TABLE Produto ADD COLUMN Marca VARCHAR(50);
ALTER TABLE Produto ADD COLUMN Fornecedor VARCHAR(50);

CREATE VIEW vw_ordem_servico AS
SELECT 
    os.*, 
    c.nome AS nome_cliente,
    c.cpf AS cpf_cliente
FROM Ordem_Servico os
LEFT JOIN Cliente c ON os.id_cliente = c.id_cliente;

CREATE OR REPLACE VIEW vw_vendas_detalhadas AS
SELECT 
    v.id_venda,
    v.data_venda,
    v.valor_final AS valor_total,
    os.id_os AS os_selecionadas,
    c.nome,
    c.cpf,
    c.Genero,
    c.DataNasc,
    c.endereco,
    c.rua,
    c.numero,
    c.Bairro,
    c.Cidade,
    c.Estado
    FROM Venda v
JOIN Ordem_Servico os ON v.id_os = os.id_os
JOIN Cliente c ON os.id_cliente = c.id_cliente;









SELECT * FROM ordem_servico;

INSERT INTO Usuario VALUES (2,'Leo_Bahia','1','2','3');


INSERT INTO Cliente (nome, cpf, telefone, email, Genero, DataNasc, endereco, rua, numero, Bairro, Cidade, Estado) 
VALUES 
('Rafael Vinícius', '111.222.333-44', '(34) 99999-1111', 'rafael@email.com', 'Masculino', '1995-03-10', 'Casa', 'Rua das Flores', 100, 'Centro', 'Uberlândia', 'MG'),
('Ana Paula Santos', '555.666.777-88', '(34) 98888-2222', 'ana@email.com', 'Feminino', '1990-07-25', 'Apto', 'Av. Rondon Pacheco', 2500, 'Santa Mônica', 'Uberlândia', 'MG'),
('Marcos Oliveira', '999.888.777-66', '(34) 97777-3333', 'marcos@email.com', 'Masculino', '1982-11-05', 'Casa', 'Alameda das Palmeiras', 50, 'Cidade Jardim', 'Uberlândia', 'MG');


INSERT INTO Produto (descricao, tipo, preco, estoque_atual, Categoria, Marca, Fornecedor) 
VALUES 
('Armação Acetato Preta', 'UN', 250.00, 15, 'Grau', 'RayBan', 'Luxottica'),
('Lente Antirreflexo Premium', 'PAR', 400.00, 50, 'Lente', 'Essilor', 'Hoya'),
('Óculos de Sol Aviador', 'UN', 580.00, 10, 'Solar', 'Oakley', 'Luxottica');

INSERT INTO Ordem_Servico (id_cliente, id_usuario_abertura, status, valor_total, valor_entrada) 
VALUES 
(1, 2, 'Aberta', 650.00, 100.00),
(2, 2, 'Aberta', 400.00, 50.00),
(3, 2, 'Finalizada', 580.00, 580.00);


INSERT INTO Item_OS (id_os, id_produto, quantidade, preco_unitario_venda)
VALUES
(1, 1, 1, 250.00), -- O.S 1 levou 1 armação
(1, 2, 1, 400.00), -- O.S 1 levou 1 par de lentes
(2, 2, 1, 400.00), -- O.S 2 levou apenas lentes
(3, 3, 1, 580.00); -- O.S 3 levou óculos de sol

INSERT INTO Venda (id_os, id_usuario_fechamento, valor_final) 
VALUES 
(7, 2, 650.00),
(8, 2, 400.00),
(9, 2, 580.00);




