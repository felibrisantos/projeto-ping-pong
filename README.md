# Jogo Pong

## Descrição

Este é um simples jogo Pong implementado em HTML5 canvas e JavaScript. O jogo possui uma bola, duas raquetes e uma linha central. Os jogadores podem controlar a raquete esquerda usando o mouse ou entrada de toque em dispositivos móveis.

## Recursos

- Design responsivo para desktops e dispositivos móveis.
- Suporte para entrada de mouse e toque para controlar a raquete esquerda.
- Acompanhamento de pontuação com reinício do jogo quando um jogador atinge uma pontuação de 5.

## Como Jogar

1. Abra o arquivo `index.html` em um navegador da web.
2. Mova o mouse para controlar a raquete esquerda em desktops ou use a entrada de toque em dispositivos móveis.
3. Ganhe pontos fazendo a bola passar pela raquete do oponente.
4. O jogo reinicia quando um jogador atinge uma pontuação de 5.

## Componentes

- `canvasElement`: Elemento canvas HTML5.
- `mouse`: Objeto que rastreia as coordenadas do mouse.
- `field`: Objeto que representa o campo de jogo.
- `line`: Objeto que representa a linha central divisória.
- `leftPaddle`: Objeto que representa a raquete do jogador à esquerda.
- `rightPaddle`: Objeto que representa a raquete do jogador à direita (controlada por IA).
- `score`: Objeto que rastreia as pontuações do jogador e do computador.
- `ball`: Objeto que representa a bola com lógica de movimento e colisão.

## Como Executar

Abra o arquivo `index.html` em um navegador da web. Nenhuma configuração adicional é necessária.

## Créditos

- Lógica do jogo inspirada nos clássicos jogos Pong.
- Utilização de HTML5 canvas e JavaScript para renderização e interatividade.

Sinta-se à vontade para personalizar e expandir o código para o seu próprio projeto!
