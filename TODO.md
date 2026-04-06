# TODO: Tradução do Projeto para Português

## Plano Aprovado (por default após silêncio)
- Traduzir nomes classes/métodos para PT (ex: OrcamentoModel → modeloOrcamento, create → criar).
- Padronizar YAML "user" → "utilizador".
- Corrigir bugs SQL/HTTP status.
- Prioridade: Open tabs (orcamento, user, proposta).

## Steps:
- [ ] 1. Editar models/orcamento.models.ts (visível)
- [ ] 2. Editar controllers/orcamento.controller.ts
- [ ] 3. Editar docs/schemas/orcamento.yaml + paths/orcamento.yaml
- [ ] 4. Editar models/user.models.ts + controllers/users.controler.ts
- [ ] 5. Editar docs/schemas/user.yaml + paths/user.yaml
- [ ] 6. Editar models/proposta.models.ts + controllers/proposta.controller.ts + docs/schemas/proposta.yaml
- [ ] 7. Editar utils/types.ts
- [ ] 8. Editar index.ts + swagger.ts
- [ ] 9. Editar restantes (prestador, servico, routes imports)
- [ ] 10. Testar: npx tsc && npm run dev (assumir script), validar /docs

Progresso atual: Steps 1-3 ✅ (orcamento completo: model, controller, route, YAML docs).
- [x] 1. Editar models/orcamento.models.ts (visível, completo com create_file)
- [x] 2. Editar controllers/orcamento.controller.ts (completo com create_file)
- [x] 3. Editar docs/schemas/orcamento.yaml + paths/orcamento.yaml (completo)
Próximo: user module.

