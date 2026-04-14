

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
 CREATE TABLE IF NOT EXISTS `tbl_empresa`(
	id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    designacao VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    localizacao VARCHAR (100) NOT NULL,
	nif DOUBLE NOT NULL UNIQUE,
    icone VARCHAR(255),
    enabled BOOLEAN,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL 
    );
   
CREATE TABLE tbl_categoria(
	id INTEGER NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
    designacao VARCHAR (255) NOT NULL,
    icone VARCHAR (255),
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
    );
    
ALTER TABLE tbl_empresa
	ADD COLUMN id_utilizador VARCHAR(255) NOT NULL AFTER icone,
	ADD CONSTRAINT fk_utilizador_empresa
    FOREIGN KEY (id_utilizador)
    REFERENCES tbl_utilizadores(id)
    ;
    
ALTER TABLE tbl_servicos
	DROP COLUMN categoria,
    ADD COLUMN id_categoria INTEGER AFTER descricao,
    ADD CONSTRAINT fk_categoria_servico
    FOREIGN KEY (id_categoria)
    REFERENCES tbl_categoria(id)
    ;
    ALTER TABLE tbl_prestacao_servico
		ADD COLUMN urgent BOOLEAN AFTER id_orcamento
        ;
	ALTER TABLE tbl_prestadores
		ADD COLUMN id_empresa INTEGER,
        ADD CONSTRAINT fk_empresa_prestadores
        FOREIGN KEY (id_empresa)
        REFERENCES tbl_empresa(id)
        ;
        
	ALTER TABLE tbl_prestacao_servico
		ADD COLUMN id_empresa INTEGER,
        ADD COLUMN tipo_prestador ENUM ("empresa","particular"),
        ADD CONSTRAINT fK_empresa_prestacao_servico
        FOREIGN KEY (id_empresa)
        REFERENCES tbl_empresa(id)
        ;
    
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
   
    
    
    
