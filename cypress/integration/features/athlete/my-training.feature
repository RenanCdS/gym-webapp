# language: pt

Funcionalidade: Treino do atleta
  O sistema deve possibilidar que o usuário (atleta) veja uma série de exercícios
  que são referentes ao treino do mesmo

  Cenário: O atleta começa um novo treino
    Dado que eu faço login com o usuário "treino_nao_inicializado@gmail.com"
    E clico no submenu "Meu treino"
    E clico no treino "A"
    Então devo ser redirecionado para a tela de treino

  Cenário: O atleta entra na página de treino quando o treino já foi iniciado 
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com"
    E clico no submenu "Meu treino"
    Então devo ser redirecionado para a tela de treino

  Cenário: O atleta finaliza todos os exercícios e visualiza a página indicando que o treino foi concluído com sucesso
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com" 
    E clico no submenu "Meu treino"
    E finalizo todos os exercícios
    Então devo ver a página de treino finalizado com sucesso

  Cenário: O atleta clica em finalizar treino sem ter concluído todos os exercícios
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com"
    E clico no submenu "Meu treino"
    E clico no botão Finalizar treino
    E clico no botão "Sim" da modal
    Então o sistema exibe a modal de treino concluído
  
  Cenário: O atleta clica no botão feito e o sistema redireciona ele para o próximo exercício
    Dado que eu faço login com o usuário "treino_inicializado@gmail.com"
    E clico no submenu "Meu treino"
    E clico no botão feito
    Então o sistema exibe o próximo exercício

  Cenário: O atleta tenta acessar acessar um treino que já foi concluído e é redirecionado para a página de treino concluído
    Dado que eu faço login com o usuário "treino_finalizado@gmail.com"
    E clico no submenu "Meu treino"
    Então devo ver a página de treino finalizado com sucesso
