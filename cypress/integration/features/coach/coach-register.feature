# language: pt

Funcionalidade: Testar a criação de um novo treinador
O sistema deve cadastrar um novo treinador após o preenchimento e
validação dos campos de texto

    Contexto:
      Dado que eu faço login com o usuário "renan@gmail.com"
      E clico no submenu "Cadastrar treinador"

    Cenario: Cadastro do treinador com sucesso
      Dado que eu preencho todos os campos do formulário de treinador corretamente
      E que clico no botão Cadastrar
      Então devo ver um toast com a mensagem "Treinador cadastrado com sucesso ; )"

    Cenario: O botão Cadastrar é clicado sem preenchimento de algum dos campos do formulário
      Quando que clico no botão Cadastrar
      Então devo ver a mensagem "campo obrigatório" nos campos não preenchidos

  @focus
    Cenario: Usuário tenta cadastrar um e-mail já existente no sistema
      Dado que eu faço login com o usuário "email-ja-cadastrado@gmail.com"
      E clico no submenu "Cadastrar treinador"
      Dado que eu preencho todos os campos do formulário de treinador corretamente
      E que clico no botão Cadastrar
      Então devo ver um toast com a mensagem "O e-mail inserido já foi cadastrado. Por favor, insira um e-mail diferente"
      

