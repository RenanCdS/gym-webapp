# language: pt

Funcionalidade: Treino do atleta
  O sistema deve possibilidar que o usuário (atleta) veja uma série de exercícios
  que são referentes ao treino do mesmo

  Cenário: O atleta começa um novo treino
    Dado que eu faço login com o usuário "treino_nao_inicializado@gmail.com"
    E clico no submenu "Meu treino"
    E clico no treino "A"
    Então devo ser redirecionado para a tela de treino
