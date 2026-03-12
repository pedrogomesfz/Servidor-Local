SELECT * FROM tbl_utilizadores;


SELECT 
id, 
nome 
FROM 
tbl_utilizadores;

SELECT tbl_utilizadores.id, tbl_prestadores.id FROM tbl_utilizadores, tbl_prestadores;  

SELECT
	tbl_orcamento.id,
    total,
    tbl_utilizadores.id,
    nome
FROM
	tbl_orcamento,
    tbl_utilizadores
WHERE
	tbl_orcamento.id_utilizadores2 = "4b016090-c538-4583-b6ba-37032f4ac5c1";
		
SELECT * FROM tbl_servicos;

SELECT * FROM tbl_utilizadores


