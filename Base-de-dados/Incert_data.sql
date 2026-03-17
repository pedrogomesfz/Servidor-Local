INSERT INTO tbl_utilizadores(
	id,
	nome, 
	numero_identificado,
	data_nascimento, 
	email,
    telefone,
	pais, 
	localidade,
	`password`,
	enabled,
	created_at,
	update_at
) VALUES (
	"4b016090-c538-4583-b6ba-37032f4ac5c1",
	"Pedro Gomes",
    "M2204",
    "1997-10-21",
    "pg266536@gmail.com",
    "5559495",
    "Cabo Verde",
    "Fazenda",
    "$2a$12$loclVaqCsfD3LIUHbwGL2eDEU6Aj/9YTeiv.IfE2CiJWj7ONBAzOe",
    true,
    NOW(),
	NOW()
    );
    
    INSERT INTO tbl_orcamento 
    VALUES (
    NULL,
		200,
        "4b016090-c538-4583-b6ba-37032f4ac5c1",
        true,
        NOW(),
        NOW()
        );
        
	INSERT INTO tbl_servicos
    VALUE (
		NULL,
		"carpintaria",
        "concerto de portas,janelas,mesas, cadeirase outros mobiliares",
        "caseiro",
        true,
        NOW(),
        NOW()
        );
	

  INSERT INTO tbl_prestadores
    VALUE (
		"122f31ae-418c-4e3b-9ba5-2d3cb8cdaffd",
        128883998,
        "Carpinteiro",
        0.2,
        1000,
        0.1,
        TRUE,
        TRUE,
        now(),
        now()
        );
        
        INSERT INTO tbl_utilizadores
        VALUE(
        "9840178a-6068-4bb3-8b37-42709c1f7311",
        "Lula Bolusco",
        "M01288",
        "1999-02-02",
        "bruittbrnbrn@gmail.com",
        5555555,
        "Cv",
        "Praia",
        "$2a$12$j8jwmSvHbKwZEnsMO3rCwuepc0Bkjfy2pfRhsqNnHBECiYGtQpnIe",
        TRUE,
        now(),
        now()
        );
        
        
        
        
        