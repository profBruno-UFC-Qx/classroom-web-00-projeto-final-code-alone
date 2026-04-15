[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/IDEzcQ6G)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=23378721)
# :checkered_flag: BibliQX
O BiblioQX é uma plataforma de gestão e autoatendimento para a Biblioteca Municipal de Quixadá. O sistema permite que cidadãos consultem o acervo digitalmente, realizem reservas de títulos e gerenciem renovações de empréstimos de forma remota, modernizando o acesso à leitura.

## :technologist: Membros da equipe
Henrique Mendes da Silva - 567841 - Sistemas de Informação

## :bulb: Objetivo Geral
Desenvolver um sistema web funcional que automatize os processos de reserva e renovação de livros, reduzindo a necessidade de deslocamento físico para questões burocráticas e otimizando o controle de inventário da biblioteca municipal.

## :eyes: Público-Alvo
- **Cidadãos de Quixadá:** Estudantes universitários (UFC, IFCE, UNICATÓLICA), alunos da rede pública e leitores em geral.

- **Servidores Públicos:** Bibliotecários e administradores responsáveis pela manutenção do acervo local.

## :star2: Impacto Esperado
**Acessibilidade:** Facilitar o acesso à cultura para moradores de distritos mais afastados do centro de Quixadá.

**Eficiência:** Diminuir filas e erros manuais no registro de empréstimos.

**Engajamento:** Aumentar o índice de leitura na cidade através de um sistema de notificações sobre prazos e disponibilidade de livros.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação
1. **Usuário não logado (Visitante):** Qualquer pessoa que acessa o site para consulta.

2. **Leitor (Usuário Comum):** Cidadão cadastrado com permissão para reservar e renovar.

3. **Bibliotecário (Administrador):** Responsável por gerenciar o acervo, validar devoluções e cadastrar novos títulos.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação
Acessíveis a todos (Público)

- Consulta de Acervo: Busca por título, autor, categoria ou ISBN.

- Visualização de Detalhes: Ver sinopse, número de exemplares disponíveis e localização na estante.

- Cadastro de Usuário: Formulário para novos leitores solicitarem acesso.

Restritas a Usuários Logados (Leitor)

- Reserva de Livros: Reservar um título que está atualmente emprestado.

- Renovação Online: Estender o prazo de entrega (caso não haja reserva de terceiros).

- Consulta de emprestimos: Painel pessoal com livros em empréstimo e pendências.

Restritas ao Administrador (Bibliotecário)

- Gestão de Acervo (CRUD): Inserir, editar ou remover livros do sistema.

- Controle de Empréstimos: Registrar a saída e a entrada física dos livros.


## :spiral_calendar: Entidades ou tabelas do sistema
1. **Livro:** Armazena título, autor, ISBN, ano, editora e status (disponível/emprestado).

2. **Usuário:** Armazena nome, CPF, e-mail, senha criptografada e tipo de perfil.

3. **Empréstimo:** Relaciona um Livro a um Usuário, contendo data de saída, data prevista de devolução e status.

4. **Exemplar:** Representa o livro físico.

5. **Reserva:** Gerencia a fila de espera para livros que estão todos emprestados.

----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.

**Backend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Entidade 1 | X |  X  |  | X |
| Entidade 2 | X |    |  X | X |
| Entidade 3 | X |    |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |
