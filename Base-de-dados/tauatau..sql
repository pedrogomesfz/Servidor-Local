

CREATE TABLE tbl_prestadores(
	id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
    nome VARCHAR(50) NOT NULL,
    precoHora DECIMAL (10, 2) NOT NULL,
    profissao VARCHAR(100) NOT NULL,
    minimoDesconto DECIMAL(10, 2),
    taxaUrgencia DECIMAL (10 , 3),
    percentagemDesconto DECIMAL(10 ,3),
    disponivel BOOLEAN NOT NULL,
    enabled BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    update_at DATETIME NOT NULL
);
ALTER TABLE tbl_prestadores
	DROP COLUMN taxaUrgencia,
	ADD COLUMN taxa_urgencia DECIMAL(10, 3) AFTER profissao,
    DROP COLUMN minimoDesconto,
    ADD  COLUMN minimo_desconto DECIMAL(10, 3) AFTER taxa_urgencia,
    DROP COLUMN percentagemDesconto,
    ADD COLUMN precentagem_desconto DECIMAL(10, 3) AFTER minimo_desconto,
    DROP COLUMN precoHora 
;
     
CREATE TABLE tbl_utilizadores(
id VARCHAR (255) PRIMARY KEY NOT NULL  UNIQUE,
nome VARCHAR(50) NOT NULL,
numero_identificado VARCHAR(255),
data_nascimento DATE,
email VARCHAR(255),
telefone VARCHAR(255),
pais VARCHAR(255),
localidade VARCHAR(255),
`password` VARCHAR(100) NOT NULL,
enabled BOOLEAN,
created_at DATETIME,
update_at DATETIME
);



CREATE TABLE tbl_servicos(
id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
nome VARCHAR(50),
descricao VARCHAR(250),
categoria VARCHAR(25) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at DATETIME NOT NULL,
update_at DATETIME NOT NULL

);

CREATE TABLE IF NOT EXISTS `tbl_orcamento` (
	`id` INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
	`total` DOUBLE NOT NULL,
	`id_utilizadores2` VARCHAR(255) NOT NULL,
	`enable_` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`update` DATETIME NOT NULL
	
);


CREATE TABLE IF NOT EXISTS `Tbl_prestacao_servico` (
	`id` INTEGER PRIMARY KEY NOT NULL UNIQUE,
	`descricao` VARCHAR(255) NOT NULL,
	`subtorial` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER NOT NULL,
	`id_prestadores` VARCHAR(255) NOT NULL,
	`id_orcamento` INTEGER NOT NULL,
	`id_servico` INTEGER,
	`preco_hora` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL
	);
    
    CREATE TABLE IF NOT EXISTS `tbl_proposta` (
	`id` INTEGER NOT NULL AUTO_INCREMENT UNIQUE,
	`id_prestacao_servico` INTEGER NOT NULL,
	`preco_hora` DOUBLE NOT NULL,
	`horas_estimadas` INTEGER NOT NULL,
	`estado` ENUM('pendente', 'aceite', 'recusada') NOT NULL,
	`enable` BOOLEAN NOT NULL,
	`created_at` DATETIME NOT NULL,
	`update_at` DATETIME NOT NULL,
	PRIMARY KEY(`id`)
);

ALTER TABLE tbl_proposta
	ADD CONSTRAINT fk_prestacao_servico_proposta
	FOREIGN KEY(id_prestacao_servico)
	REFERENCES tbl_prestacao_servico(id)
;
ALTER TABLE tbl_prestacao_servico
	ADD CONSTRAINT fk_prestadores_servico
    FOREIGN KEY (id_prestadores)
    REFERENCES tbl_prestadores(id),
    ADD CONSTRAINT fk_prestadores_servico
	FOREIGN KEY (id_servico)
    REFERENCES tbl_servico(id)
    ;
    
    
