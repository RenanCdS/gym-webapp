# language: pt

Funcionalidade: Testar o login da aplicação
O sistema deve possibilitar que o usuário se autentique e acesse o app

Cenario: O usuário realiza o login com sucesso
  Dado que eu faço login com o usuário "renan@gmail.com"
  Então devo ver a página home

Cenario: O usuário insere um e-mail errado
  Dado que eu faço login com o usuário "renan.com"
  Então devo ver a mensagem "por favor, insira um e-mail válido" no campo de e-mail

Cenario: O usuário clica no botão Entrar sem preencher o campo username
  Dado que eu clico no botão Entrar
  Então devo ver a mensagem "campo obrigatório" no campo de e-mail

Cenario: O usuario insere a senha ou o e-mail errados
  Dado que eu faço login com o usuário "usuario.invalido@gmail.com"
  Então devo ver o toast informando "E-mail ou senha incorretos"
