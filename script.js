// dicionário de respostas (agora usando palavras-chave para cada cenário)
const respostas = {

     "saudacao":{
        "chaves":    ["oi, tudo bem com voce?"],
        "resposta":  "Oi, por aqui tá tudo bem. E você como está?"
    },

    "saudacao2": {
        "chaves":   ["oi", "ola", "hey", "salve", "opa"],
        "resposta": "Oi, tudo bem com você?"
    },

   
    "bem_estar": {
        "chaves":    ["tudo bem", "como vai", "tudo bom"],
        "resposta":  "Que bom! Quer conversar sobre algo?"
    },
    "tristeza": { // Adicionei um novo cenário como exemplo
        "chaves":     ["triste", "mal", "bad", "deprimido"],
        "resposta":   "Sinto muito por isso. Quer me contar o que aconteceu?"
    }
};

//botão para enviar a mensagem
let botao_enviar_mensagem = document.getElementById("enviar_mensagem");

//ao clicar no botão
botao_enviar_mensagem.addEventListener("click", function () {
    
    //pego id do meu texto e salvo numa var
    //adicionei o normalize para ele ignorar acentos (ex: Olá e Ola viram o mesmo)
    const input = document.getElementById("meu_texto").value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    //no meu index, criei um p para aparecer a resposta na tela
    const respostaElemento = document.getElementById("resposta");

    // Variável para controlar se encontramos uma resposta
    let respostaEncontrada = null;

    // Em vez de checar a chave exata, percorremos o dicionário procurando palavras-chave
    for (let categoria in respostas) {
        // Verificamos se alguma das palavras-chave daquela categoria está na frase digitada
        const temPalavraChave = respostas[categoria].chaves.some(palavra => input.includes(palavra));
        
        if (temPalavraChave) {
            respostaEncontrada = respostas[categoria].resposta;
            break; // Para o loop assim que encontrar a primeira resposta
        }
    }

    // Se a resposta encontrada for válida
    if (respostaEncontrada) {
        //ele escreve a resposta correspondente 
        respostaElemento.innerText = respostaEncontrada;
    } 
    else {
        //ele retorna isso
        respostaElemento.innerText = "Não entendi a pergunta.";
    }
});
