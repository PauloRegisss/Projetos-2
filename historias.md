# Histórias de Usuário – Projeto Nexus

Histórias de usuário do Projeto Nexus, com os cenários de validação escritos em BDD (Dado / Quando / Então).

| # | História | Entrega | Status |
|---|----------|---------|--------|
| 1 | [Alternar tema claro/escuro](#história-1--alternar-tema-claroescuro) | 3 | ✅ Implementada |
| 2 | [Abrir o chatbot](#história-2--abrir-o-chatbot) | 3 | ✅ Implementada |
| 3 | [Receber as perguntas do chatbot](#história-3--receber-as-perguntas-do-chatbot) | 3 | ✅ Implementada |
| 4 | [Responder às perguntas](#história-4--responder-às-perguntas) | 3 | ✅ Implementada |
| 5 | [Gerar o Showroom a partir das respostas](#história-5--gerar-o-showroom-a-partir-das-respostas) | 3 | ✅ Implementada |
| 6 | [Visualizar o Showroom](#história-6--visualizar-o-showroom) | 3 | ✅ Implementada |

---

## História 1 – Alternar tema claro/escuro

**Como** usuário da plataforma,
**eu quero** poder alternar entre o modo claro e o modo escuro na interface,
**para que** eu possa adaptar a visualização à minha preferência e conforto visual durante a navegação.

### Cenários de validação

**Cenário 1: Mudar do tema claro para o escuro**
- **Dado** que estou numa página do site com o tema claro ativo
- **Quando** eu clico no botão de alternar tema (ícone de lua)
- **Então** a interface passa a usar as cores do tema escuro
- **E** o ícone do botão muda para o sol

**Cenário 2: Mudar do tema escuro para o claro**
- **Dado** que estou com o tema escuro ativo
- **Quando** eu clico no botão de alternar tema (ícone de sol)
- **Então** a interface passa a usar as cores do tema claro

**Cenário 3: Preferência lembrada**
- **Dado** que eu escolhi o tema escuro
- **Quando** eu recarrego a página ou volto ao site depois
- **Então** o site abre com o tema escuro

**Cenário 4: Tema do sistema na primeira visita**
- **Dado** que é minha primeira visita e meu sistema operacional está no modo escuro
- **Quando** eu abro o site
- **Então** o site abre com o tema escuro

---

## História 2 – Abrir o chatbot

**Como** tomador de decisão do negócio,
**eu quero** abrir a tela do chatbot conversacional,
**para que** eu possa iniciar o processo de avaliação do impacto do IoT na minha empresa.

### Cenários de validação

**Cenário 1: Abrir pelo botão flutuante**
- **Dado** que estou em qualquer página do site
- **Quando** eu clico no botão flutuante do assistente, no canto da tela
- **Então** o painel do chat é aberto
- **E** a primeira pergunta é exibida

**Cenário 2: Abrir pela página do Showroom**
- **Dado** que estou na página `/showroom` sem uma simulação
- **Quando** eu clico em "Começar simulação"
- **Então** o painel do chat é aberto

**Cenário 3: Fechar o chat**
- **Dado** que o chat está aberto
- **Quando** eu clico em fechar ou aperto a tecla Esc
- **Então** o painel do chat é fechado e continuo na mesma página

---

## História 3 – Receber as perguntas do chatbot

**Como** usuário,
**eu quero** receber perguntas automatizadas sobre a operação do meu negócio através do chatbot,
**para que** a IA possa mapear e compreender o meu cenário empresarial atual.

### Cenários de validação

**Cenário 1: Perguntas carregadas do servidor**
- **Dado** que abri o chat
- **Quando** o chat é carregado
- **Então** o sistema busca as perguntas em `GET /chat/perguntas/`
- **E** mostra a primeira pergunta: "Qual o setor da sua empresa?"

**Cenário 2: Uma pergunta por vez, com progresso**
- **Dado** que estou respondendo o chat
- **Quando** eu respondo uma pergunta
- **Então** a próxima pergunta é exibida
- **E** a barra de progresso mostra quanto falta para terminar

**Cenário 3: Campo adequado ao tipo da pergunta**
- **Dado** que a pergunta atual é numérica (ex.: gasto com energia)
- **Então** o campo aceita apenas números, respeitando os limites mínimo e máximo
- **Dado** que a pergunta atual é de escolha (ex.: como é feito o monitoramento)
- **Então** as opções são exibidas como botões: "Manual", "Parcialmente automatizado" e "Já uso sensores"

**Cenário 4: Falha ao carregar as perguntas**
- **Dado** que o servidor está indisponível
- **Quando** eu abro o chat
- **Então** é exibida uma mensagem de erro com o botão "Tentar de novo"

---

## História 4 – Responder às perguntas

**Como** usuário da plataforma,
**eu quero** responder às perguntas enviadas pelo chatbot,
**para que** a IA receba os dados reais da minha empresa como entrada.

### Cenários de validação

**Cenário 1: Resposta válida**
- **Dado** que a pergunta atual é "Quanto a empresa gasta por mês com energia (R$)?"
- **Quando** eu respondo "42000"
- **Então** minha resposta aparece no chat
- **E** a próxima pergunta é exibida

**Cenário 2: Resposta fora do limite**
- **Dado** que a pergunta atual é "Qual % de perdas/desperdício você estima hoje?"
- **Quando** eu respondo "150"
- **Então** é exibida a mensagem "O valor máximo é 100."
- **E** o chat não avança para a próxima pergunta

**Cenário 3: Resposta vazia**
- **Dado** que estou em qualquer pergunta
- **Quando** eu tento avançar sem responder
- **Então** é exibida a mensagem "Este campo é obrigatório."

**Cenário 4: Número inteiro obrigatório**
- **Dado** que a pergunta atual é "Quantos funcionários a empresa tem?"
- **Quando** eu respondo "2,5"
- **Então** é exibida a mensagem "Informe um número inteiro."

**Cenário 5: Voltar e recomeçar**
- **Dado** que já respondi algumas perguntas
- **Quando** eu clico em "Voltar"
- **Então** volto para a pergunta anterior e posso alterar a resposta
- **Quando** eu clico em "Recomeçar"
- **Então** as respostas são apagadas e o chat volta para a primeira pergunta

**Cenário 6: Validação também no servidor**
- **Dado** que alguém envia respostas inválidas direto para `POST /chat/simular/` (sem passar pelo chat)
- **Quando** o servidor recebe a requisição
- **Então** ele responde com status 400 e os erros de cada campo
- **E** nenhuma simulação é salva

---

## História 5 – Gerar o Showroom a partir das respostas

**Como** usuário,
**eu quero** que a IA processe os dados informados e gere um Showroom Interativo,
**para que** o impacto da adoção do IoT no meu negócio seja calculado e estruturado automaticamente.

### Cenários de validação

**Cenário 1: Simulação gerada com sucesso**
- **Dado** que respondi todas as perguntas com valores válidos
- **Quando** eu clico em "Gerar meu Showroom"
- **Então** é exibido um indicador de carregamento
- **E** o sistema calcula as métricas com e sem IoT, gera a análise e salva a simulação
- **E** sou redirecionado para `/showroom/<id da simulação>`

**Cenário 2: Ganho menor para quem já tem sensores**
- **Dado** duas empresas com as mesmas respostas, exceto o monitoramento
- **Quando** uma responde "Manual" e a outra "Já uso sensores"
- **Então** a economia estimada da empresa com monitoramento manual é maior

**Cenário 3: Mesmas respostas, mesmo resultado**
- **Dado** que envio as mesmas respostas duas vezes
- **Então** as métricas e a economia calculadas são iguais nas duas simulações

**Cenário 4: IA indisponível**
- **Dado** que a API de IA não está configurada ou não responde
- **Quando** eu gero o Showroom
- **Então** a simulação é gerada normalmente
- **E** é exibida uma análise padrão com a economia estimada

**Cenário 5: Muitas simulações seguidas**
- **Dado** que já gerei 5 simulações no último minuto
- **Quando** eu tento gerar mais uma
- **Então** é exibida a mensagem "Muitas simulações seguidas." pedindo para aguardar

---

## História 6 – Visualizar o Showroom

**Como** tomador de decisão do negócio,
**eu quero** visualizar o showroom gerado pela IA,
**para que** eu possa comparar as métricas reais de desempenho e eficiência da minha empresa nos cenários com e sem IoT.

### Cenários de validação

**Cenário 1: Comparativo exibido**
- **Dado** que gerei uma simulação
- **Quando** o Showroom é aberto
- **Então** vejo a economia estimada por mês e por ano
- **E** vejo energia, manutenção, horas de parada e desperdício, com os valores sem IoT e com IoT em barras comparativas
- **E** vejo a análise do resultado
- **E** vejo o aviso de que os valores são estimativas

**Cenário 2: Link próprio da simulação**
- **Dado** que estou no Showroom de uma simulação
- **Quando** eu recarrego a página ou abro o mesmo link em outro navegador
- **Então** o mesmo resultado é exibido

**Cenário 3: Simulação inexistente**
- **Dado** um link de Showroom com um id que não existe
- **Quando** eu abro o link
- **Então** é exibida a mensagem de simulação não encontrada
- **E** o botão "Refazer simulação", que abre o chat

**Cenário 4: Entrar em contato**
- **Dado** que estou no Showroom
- **Quando** eu clico na chamada para contato
- **Então** sou levado para a página `/contato`
