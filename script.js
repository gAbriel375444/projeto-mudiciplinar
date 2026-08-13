// Captura os elementos HTML da tela para podermos mexer neles via JavaScript
const chatOutput = document.getElementById("chat-output"); // A área onde os balões de mensagens aparecem
const userInput = document.getElementById("user-input");   // A caixinha de texto onde o usuário digita

/**
 * Função responsável por criar e exibir um balão de mensagem na tela.
 * @param {string} role - Quem está enviando ('user' para usuário, 'bot' para o Hobot)
 * @param {string} text - O texto da mensagem
 */
function displayMessage(role, text) {
    const msgDiv = document.createElement("div"); // Cria uma tag <div> nova na memória
    
    // Se for usuário, ganha a classe 'user-msg'. Se for o bot, ganha 'bot-msg' para o CSS estilizar diferente
    msgDiv.className = role === "user" ? "msg user-msg" : "msg bot-msg";
    
    // msgDiv.innerHTML = text; 

    msgDiv.textContent = text; // trata tudo como texto puro, não como HTML e Insere o texto dentro da div criada
    chatOutput.appendChild(msgDiv); // Joga essa nova div dentro da área de mensagens do site
    chatOutput.scrollTop = chatOutput.scrollHeight; // Faz a rolagem da tela descer automaticamente
}

/**
 * Função principal que processa o envio do usuário.
 * Usamos "async" porque ela vai fazer uma requisição na internet que demora alguns segundos para responder.
 */
async function processUserInput() {

    // Pega o que foi digitado e remove espaços inúteis do início/fim
    const message = userInput.value.trim(); 
    // Se a caixinha estiver vazia, para a função aqui e não faz nada
    if (!message) return; 


    // trava o input assim que começa o processamento //
    //impede que o usuário envie multiplas mensagens enquanto o Hobot pensa  
    userInput.disabled = true; 
      

    // Mostra o desabafo do usuário na tela imediatamente
    displayMessage("user", message); 
    // Limpa a caixinha de texto para o usuário digitar a próxima mensagem
    userInput.value = ""; 


    // Cria o indicador visual de que o robô está processando a resposta
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing";
    typingIndicator.innerText = "O Hope está pensando...";
    // Joga o "O Hope está pensando..." na tela
    chatOutput.appendChild(typingIndicator); 
    // Rola a tela para baixo
    chatOutput.scrollTop = chatOutput.scrollHeight; 

    try {
        // [CONEXÃO COM A IA]: Faz uma chamada de rede para a nossa rota segura na Vercel
        // O comando 'await' faz o código pausar aqui até a internet devolver a resposta
        const response = await fetch('/api/chat', {
            // Método POST serve para enviar dados (estamos enviando o desabafo)
            method: 'POST', 

            // Avisa que estamos enviando um texto em formato JSON
            headers: { 'Content-Type': 'application/json' }, 

            // Transforma o desabafo em texto puro seguro para envio
            body: JSON.stringify({ mensagem: message }) 
        });

        //  Transforma a resposta que chegou da internet em um objeto JavaScript legível
        const dados = await response.json();

        // Remove o balão de "O Hobot está pensando..." da tela
        typingIndicator.remove(); 

        // Se a IA respondeu com sucesso, exibe o conselho dela na tela
        if (dados.respostadaIA) {
            displayMessage("bot", dados.respostadaIA);
        } else {
            // Caso aconteça algum bug na comunicação da IA, exibe uma desculpa
            displayMessage("bot", "Desculpe, tive um probleminha para processar isso agora. Pode repetir?");
        }

    } catch (error) {
        // Código de segurança: se a internet cair ou o servidor falhar, entra aqui
        console.error("Erro ao falar com a IA:", error);
        typingIndicator.remove(); // Remove o indicador de digitação para não ficar travado na tela
        displayMessage("bot", "Estou com dificuldades para me conectar agora. Quer tentar de novo?");
    }
    finally {
        //libera o input no final, aconteça o que acontecer
        userInput.disabled = false; 
    }
}


// Escuta o teclado do usuário. Se ele apertar a tecla "Enter", dispara a função de enviar
userInput.addEventListener("keyup", (e) => { 
    if (e.key === "Enter") processUserInput(); 
});

// Mensagem inicial de boas-vindas que aparece assim que o site carrega na tela
window.onload = () => {
    setTimeout(() => {
        displayMessage("bot", "Oi... percebi que você veio até aqui. Como está o seu coração hoje? Se quiser desabafar, sou todo ouvidos. ");
    }, 2000); // Diminuí para 2 segundos para o usuário não esperar tanto ao abrir o site
};
