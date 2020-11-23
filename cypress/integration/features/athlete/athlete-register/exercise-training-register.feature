# language: pt

Funcionalidade: Cadastro dos dados do atleta e do treino
  O sistema deve possibilitar que o treinador cadastre um treino com uma série de exercícios 
  após preenchimento dos dados pessoais do aluno

  Contexto: 
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com"
    E clico no submenu "Cadastrar aluno"
    E preencho os campos com os seguintes dados:
    | nome  | idade | email           | telefone  | peso | altura | senha |
    | Teste | 20    | teste@gmail.com | 123456789 | 86   | 1.86   | 123   |
    E clico no botão próximo

@focus
  Cenário:
    Dado que eu preencho os dados do treino "A" com as informações:
    | exercício | peso | quantidade | repetições | séries |
    | Supinão   | 40   | 8          | 8          | 4      |
    E clico no botão +1 do treino "A"
    Então devo ver os campos do treino "A" resetados
   
