"""Respostas prontas sobre IoT, usadas quando a IA não está configurada ou falha."""

import re
import unicodedata

RESPOSTA_FORA_DO_TEMA = (
    "Só consigo responder a perguntas sobre IoT e sobre o site. Tente perguntar sobre "
    "sensores, MQTT, LoRaWAN, segurança, manutenção preditiva, custos ou o uso de IoT no "
    "seu setor. Para outros assuntos, fale com a equipe na página de contato."
)

RESPOSTA_SAUDACAO = (
    "Olá! Eu sou a NEXUS. Posso explicar o que é IoT, como funcionam sensores e "
    "conectividade, e como a tecnologia ajuda no seu setor. O que você quer saber?"
)

RESPOSTA_AGRADECIMENTO = (
    "Por nada! Se quiser estimar o impacto do IoT na sua empresa, faça a simulação no "
    "Showroom."
)

# Cada termo também casa com o que vem depois dele: "sensor" encontra "sensores".
# O tema escolhido é o que tem mais texto casado, então termos específicos ganham de "iot".
TEMAS = [
    {
        "nome": "geral",
        "termos": ("iot", "internet das coisas"),
        "resposta": (
            "IoT, ou Internet das Coisas, é a conexão de máquinas, sensores e outros objetos "
            "à internet para coletar e trocar dados sem depender de anotação manual. Em uma "
            "empresa, isso mostra o que acontece na operação em tempo real e ajuda a agir "
            "antes que um problema vire prejuízo."
        ),
        "exemplo": (
            "Um sensor de vibração instalado em um motor envia leituras para um painel. Se a "
            "vibração sai do normal, a equipe recebe um alerta e faz a manutenção antes de a "
            "máquina parar."
        ),
    },
    {
        "nome": "sensores",
        "termos": ("sensor", "atuador", "telemetria", "dispositivo", "medir", "medicao"),
        "resposta": (
            "Sensores medem algo do mundo físico, como temperatura, vibração, umidade ou "
            "consumo de energia, e transformam essa medida em dados. Atuadores fazem o caminho "
            "inverso: recebem um comando e agem, como abrir uma válvula ou desligar um motor. "
            "Telemetria é o envio dessas medições à distância."
        ),
        "exemplo": (
            "Em uma câmara fria, um sensor de temperatura envia a leitura a cada minuto. Se a "
            "temperatura sobe demais, o sistema avisa a equipe e pode acionar um atuador para "
            "ligar a refrigeração reserva."
        ),
    },
    {
        "nome": "mqtt",
        "termos": ("mqtt", "protocolo", "coap", "broker"),
        "resposta": (
            "MQTT é um protocolo leve de mensagens muito usado em IoT. Os dispositivos publicam "
            "dados em tópicos, e um servidor chamado broker entrega essas mensagens a quem "
            "assinou cada tópico. Ele consome pouca banda e funciona bem em redes instáveis."
        ),
        "exemplo": (
            "Um sensor publica a temperatura no tópico fabrica/linha1/temperatura. O broker "
            "repassa o dado ao painel e ao sistema de alertas, que assinaram esse tópico, sem "
            "que o sensor precise conhecer nenhum dos dois."
        ),
    },
    {
        "nome": "lorawan",
        "termos": ("lora", "lpwan"),
        "resposta": (
            "LoRaWAN é uma rede sem fio de longo alcance e baixo consumo de energia. Ela permite "
            "que sensores a bateria enviem pequenas quantidades de dados a quilômetros de "
            "distância. Em troca, a taxa de transmissão é baixa, então não serve para vídeo ou "
            "grandes volumes de dados."
        ),
        "exemplo": (
            "Em uma fazenda, sensores de umidade do solo espalhados pela lavoura enviam leituras "
            "algumas vezes por hora para um único gateway, e as baterias podem durar bastante "
            "tempo por causa do baixo consumo."
        ),
    },
    {
        "nome": "conectividade",
        "termos": (
            "conectividade", "wifi", "wi fi", "bluetooth", "zigbee", "nb iot", "4g", "5g",
            "rede", "internet no campo",
        ),
        "resposta": (
            "A melhor conexão depende da distância, do consumo de energia e do volume de dados. "
            "Wi-Fi atende bem ambientes internos com muitos dados. Bluetooth e Zigbee servem "
            "para curtas distâncias. LoRaWAN e NB-IoT levam poucos dados longe, com baixo "
            "consumo. Já o 4G e o 5G cobrem grandes áreas, com custo de dados."
        ),
        "exemplo": (
            "Uma fábrica pode usar Wi-Fi nas máquinas perto da rede interna, LoRaWAN nos sensores "
            "a bateria do pátio e 4G nos veículos que circulam fora da empresa."
        ),
    },
    {
        "nome": "edge",
        "termos": ("edge", "borda", "nuvem", "cloud", "gateway"),
        "resposta": (
            "Na nuvem, os dados são guardados e analisados em servidores remotos, o que facilita "
            "ver históricos e cruzar informações. Em edge computing, parte do processamento "
            "acontece perto das máquinas, o que reduz o tempo de resposta e mantém funções "
            "essenciais mesmo sem internet. Muitos projetos combinam os dois."
        ),
        "exemplo": (
            "Um gateway na fábrica desliga uma máquina na hora se detectar uma leitura perigosa, "
            "e envia só os resumos para a nuvem, onde a equipe acompanha as tendências."
        ),
    },
    {
        "nome": "seguranca",
        "termos": (
            "seguranca", "hacker", "ataque", "invasao", "senha", "vulnerab", "privacidade",
            "lgpd", "criptograf",
        ),
        "resposta": (
            "Em IoT, as principais medidas de segurança são trocar senhas padrão, usar "
            "criptografia na comunicação, manter o firmware atualizado e separar os dispositivos "
            "da rede principal da empresa. Se houver dados pessoais envolvidos, o projeto também "
            "precisa seguir a LGPD."
        ),
        "exemplo": (
            "Se uma câmera com senha de fábrica for invadida em uma rede separada, o invasor não "
            "alcança diretamente os computadores e sistemas financeiros da empresa."
        ),
    },
    {
        "nome": "preditiva",
        "termos": ("preditiva", "manutencao", "falha", "parada", "quebra"),
        "resposta": (
            "Na manutenção preditiva, sensores acompanham sinais como vibração e temperatura para "
            "identificar desgaste antes da falha. Em vez de esperar a quebra ou trocar peças só "
            "por calendário, a equipe intervém no momento certo, o que tende a reduzir paradas "
            "não planejadas."
        ),
        "exemplo": (
            "A vibração de um rolamento aumenta aos poucos durante semanas. O sistema percebe a "
            "tendência e avisa a equipe, que troca a peça em uma parada programada."
        ),
    },
    {
        "nome": "custos",
        "termos": (
            "cust", "preco", "economi", "reduz", "retorno", "investimento", "roi", "vale a pena",
            "caro", "barato", "desperdicio", "gasto",
        ),
        "resposta": (
            "O IoT reduz custos ao mostrar onde há perda: energia gasta sem necessidade, paradas "
            "evitáveis, desperdício e manutenção fora de hora. O investimento varia conforme a "
            "quantidade de sensores, a conectividade e o software. Para ter uma estimativa com os "
            "números da sua empresa, faça a simulação no Showroom."
        ),
        "exemplo": (
            "Ao medir o consumo por máquina, uma empresa pode descobrir equipamentos ligados sem "
            "produzir fora do horário de operação e desligá-los, cortando esse gasto."
        ),
    },
    {
        "nome": "automacao",
        "termos": ("automat", "automacao", "processo"),
        "resposta": (
            "Com IoT dá para automatizar coletas de dados que antes eram manuais, alertas quando "
            "algo sai do normal, relatórios e ações simples, como ligar ou desligar equipamentos "
            "segundo regras definidas. O bom ponto de partida é uma tarefa repetitiva que hoje "
            "depende de alguém conferir e anotar."
        ),
        "exemplo": (
            "Em vez de um funcionário anotar a temperatura de cada câmara várias vezes por dia, os "
            "sensores registram tudo sozinhos e só chamam alguém quando há um desvio."
        ),
    },
    {
        "nome": "implantacao",
        "termos": (
            "implant", "comecar", "por onde", "primeiro passo", "instalar", "adotar", "piloto",
            "quanto tempo",
        ),
        "resposta": (
            "O caminho mais seguro é começar pequeno: escolha um problema caro, como uma máquina "
            "que para com frequência, defina o que medir e faça um piloto com poucos sensores. "
            "Se o resultado for bom, expanda para outras áreas. O prazo e o investimento dependem "
            "do tamanho da operação."
        ),
        "exemplo": (
            "Uma empresa instala sensores em uma única máquina crítica, compara as paradas antes "
            "e depois e usa esse resultado para decidir se vale levar o projeto às outras linhas."
        ),
    },
    {
        "nome": "dados",
        "termos": ("dados", "dashboard", "painel", "monitoramento", "monitorar", "alerta", "tempo real"),
        "resposta": (
            "O monitoramento com IoT reúne os dados dos sensores em um painel, com o estado atual "
            "e o histórico da operação. Com isso, a equipe recebe alertas quando algo sai do "
            "normal e toma decisões com base em medições, não só na observação."
        ),
        "exemplo": (
            "Um painel mostra o consumo de energia por linha de produção. Quando uma linha gasta "
            "mais do que o normal, o responsável recebe um alerta e investiga a causa."
        ),
    },
    {
        "nome": "industria",
        "termos": ("industria", "fabrica", "maquina", "producao", "manufatura"),
        "resposta": (
            "Na indústria, o IoT é usado para monitorar máquinas, prever falhas, medir o consumo de "
            "energia e acompanhar a produção em tempo real. Assim, a equipe enxerga gargalos e "
            "perdas que passariam despercebidos na observação manual."
        ),
        "exemplo": (
            "Na indústria, sensores de vibração antecipam falhas em motores, medidores mostram o "
            "consumo de energia por máquina e contadores registram a produção de cada linha."
        ),
    },
    {
        "nome": "agro",
        "termos": ("agro", "agricultura", "fazenda", "lavoura", "irrigacao", "plantacao", "rural"),
        "resposta": (
            "No agronegócio, o IoT ajuda a acompanhar solo, clima, irrigação, máquinas e "
            "armazenagem. Com esses dados, o produtor pode usar melhor a água e os insumos e "
            "reagir mais rápido a mudanças na lavoura."
        ),
        "exemplo": (
            "Sensores de umidade do solo mostram quais áreas realmente precisam de água, e a "
            "irrigação é acionada só nesses pontos, evitando desperdício."
        ),
    },
    {
        "nome": "logistica",
        "termos": (
            "logistica", "frota", "caminh", "transporte", "rastre", "veiculo", "frio", "frigor",
            "armazem", "estoque",
        ),
        "resposta": (
            "Na logística, o IoT permite rastrear veículos e cargas, acompanhar o consumo de "
            "combustível e monitorar a temperatura na cadeia de frios. Isso dá mais visibilidade "
            "das entregas e ajuda a evitar perdas no caminho."
        ),
        "exemplo": (
            "Um sensor em um caminhão refrigerado registra a temperatura durante toda a viagem. Se "
            "ela sair da faixa segura, a equipe é avisada a tempo de agir e não perder a carga."
        ),
    },
    {
        "nome": "energia",
        "termos": ("energia", "eletric", "consumo"),
        "resposta": (
            "Com medidores conectados, a empresa vê o consumo de energia por máquina, setor e "
            "horário. Isso ajuda a achar desperdícios, evitar picos e medir se uma mudança "
            "realmente trouxe economia."
        ),
        "exemplo": (
            "O monitoramento revela que um compressor continua ligado de madrugada, sem produção. "
            "Ao programar o desligamento, a empresa elimina esse consumo."
        ),
    },
    {
        "nome": "outros_setores",
        "termos": (
            "hospital", "saude", "varejo", "loja", "supermercado", "predio", "condominio",
            "casa inteligente", "casas inteligentes", "cidade inteligente", "cidades inteligentes",
            "setor", "exemplos de uso", "casos de uso",
        ),
        "resposta": (
            "O IoT aparece em muitos setores. Na saúde, monitora equipamentos e a temperatura de "
            "medicamentos. No varejo, acompanha refrigeradores e estoques. Em prédios, controla "
            "energia, climatização e segurança. Em cidades, ajuda na iluminação e na gestão de "
            "tráfego. Me diga o seu setor para eu dar um exemplo mais próximo."
        ),
        "exemplo": (
            "Um supermercado monitora a temperatura dos refrigeradores e recebe um alerta quando "
            "um deles começa a falhar, antes de perder os produtos."
        ),
    },
    {
        "nome": "showroom",
        "termos": ("showroom", "simulacao", "simular", "comparativo"),
        "resposta": (
            "O Showroom faz 8 perguntas sobre a sua operação e estima a economia com IoT, comparando "
            "energia, manutenção, paradas e desperdício com e sem a tecnologia. Os valores são "
            "estimativas, e você pode começar a simulação em /showroom."
        ),
        "exemplo": (
            "Você informa dados como o gasto mensal com energia e as horas de parada, e recebe a "
            "economia estimada por mês e por ano, com um link próprio para compartilhar."
        ),
    },
    {
        "nome": "contato",
        "termos": ("contato", "especialista", "falar com", "equipe", "orcamento", "atendente"),
        "resposta": (
            "Para falar com a equipe, use a página /contato. Sua mensagem fica disponível para a "
            "equipe, que pode entender o seu cenário com mais detalhes."
        ),
        "exemplo": (
            "Na página de contato, conte o seu setor e o problema que você quer resolver, para a "
            "equipe entender melhor o seu cenário."
        ),
    },
    {
        "nome": "nexus",
        "termos": ("nexus", "bzutech", "quem e voce", "quem sao voces", "o que voce faz", "projeto"),
        "resposta": (
            "A NEXUS é um projeto criado em parceria com a BzuTech, empresa de IoT, para mostrar às "
            "empresas o valor de coletar dados da operação. Aqui você pode tirar dúvidas sobre IoT "
            "e estimar o impacto da tecnologia no Showroom."
        ),
        "exemplo": (
            "Você pode me perguntar o que é MQTT, por exemplo, e depois fazer a simulação no "
            "Showroom com os números da sua empresa."
        ),
    },
]

_PEDE_EXEMPLO = re.compile(r"\b(exemplos?|como assim|explica melhor|detalh\w*)\b")
_SAUDACAO = re.compile(r"^(oi+|ola|opa|e ai|bom dia|boa tarde|boa noite)\b")
_AGRADECIMENTO = re.compile(r"^(obrigad[oa]|valeu|muito obrigad[oa]|show)\b")
_REGEX_TERMOS = {
    tema["nome"]: [re.compile(rf"\b{re.escape(termo)}\w*") for termo in tema["termos"]]
    for tema in TEMAS
}


def _normalizar(texto):
    sem_acento = unicodedata.normalize("NFKD", texto)
    sem_acento = "".join(c for c in sem_acento if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", " ", sem_acento.lower()).strip()


def _encontrar_tema(texto):
    melhor, melhor_pontos = None, 0
    for tema in TEMAS:
        pontos = sum(
            len(casamento.group())
            for regex in _REGEX_TERMOS[tema["nome"]]
            for casamento in regex.finditer(texto)
        )
        if pontos > melhor_pontos:
            melhor, melhor_pontos = tema, pontos
    return melhor


def responder_localmente(mensagens):
    """Responde à última mensagem; "dê um exemplo" usa o tema da pergunta anterior."""
    perguntas = [_normalizar(m["content"]) for m in mensagens if m["role"] == "user"]
    atual = perguntas[-1]
    pede_exemplo = bool(_PEDE_EXEMPLO.search(atual))

    tema = _encontrar_tema(atual)
    if tema:
        return tema["exemplo"] if pede_exemplo else tema["resposta"]

    if pede_exemplo:
        for pergunta in reversed(perguntas[:-1]):
            anterior = _encontrar_tema(pergunta)
            if anterior:
                return anterior["exemplo"]
        return _encontrar_tema("iot")["exemplo"]

    if _SAUDACAO.match(atual):
        return RESPOSTA_SAUDACAO
    if _AGRADECIMENTO.match(atual):
        return RESPOSTA_AGRADECIMENTO
    return RESPOSTA_FORA_DO_TEMA
