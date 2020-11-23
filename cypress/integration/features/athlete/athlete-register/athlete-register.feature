# language: pt

Funcionalidade: Cadastro dos dados do atleta e do treino
  O sistema deve possibilitar que o treinador cadastre um atleta com seu respectivo treino

  Cenário: Preencho todos os dados do usuário com sucesso e sigo para o step de preenchimento de treino
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com"
    E clico no submenu "Cadastrar aluno"
    E preencho os campos com os seguintes dados:
    | nome  | idade | email           | telefone  | peso | altura | senha |
    | Teste | 20    | teste@gmail.com | 123456789 | 86   | 1.86   | 123   |
    E clico no botão próximo
    Então devo ver o step de "Treino A do aluno"

  
  Cenário: Clico no botão próximo sem preencher os campos
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com"
    E clico no submenu "Cadastrar aluno"
    E clico no botão próximo
    Então devo ver feedbacks de "esse campo é obrigatório"

  @focus
  Cenário: Preencho campo e-mail com um e-mail inválido
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com"
    E clico no submenu "Cadastrar aluno"
    E preencho os campos com os seguintes dados:
    | nome  | idade | email           | telefone  | peso | altura | senha |
    | Teste | 20    | teste           | 123456789 | 86   | 1.86   | 123   |
    E clico no botão próximo
    Então devo ver feedbacks de "por favor, insira um e-mail válido"
