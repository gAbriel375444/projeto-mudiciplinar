const chatOutput = document.getElementById("chat-output");
const userInput = document.getElementById("user-input");

// Banco de respostas empáticas
const conselhos = {
    tristeza: [
        "Sinto muito que você esteja passando por isso. É normal se sentir assim às vezes.",
        "Respire fundo. Você não precisa resolver tudo hoje. Quer me contar mais sobre o que aconteceu?",
        "Estou aqui te ouvindo. Chorar ou ficar triste faz parte do processo de cura, não se cobre tanto."
    ],
    solidao: [
        "A solidão dói, mas saiba que você não está falando sozinho agora. Eu estou aqui.",
        "Às vezes nos sentimos sós mesmo rodeados de gente. O que você acha que ajudaria a confortar seu coração agora?"
    ],
    ansiedade: [
        "Tente focar no agora. O que você consegue ver e ouvir ao seu redor?",
        "Seus pensamentos estão acelerados? Lembre-se: pensamentos não são fatos. Vai passar."
    ],
    apoio: [
        "Você é mais forte do que imagina, mesmo nos dias em que não acredita nisso.",
        "Um passo de cada vez. O que você gostaria de fazer por você hoje, mesmo que seja algo pequeno?"
    ],
    fallback: "Entendo... continue falando, estou te ouvindo com atenção."};

function displayMessage(role, text) {
    const msgDiv = document.createElement("div");
    msgDiv.className = role === "user" ? "msg user-msg" : "msg bot-msg";
    msgDiv.innerHTML = text;
    chatOutput.appendChild(msgDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;}

function getBotResponse(input) {
    const text = input.toLowerCase();

    // Detecção de Tristeza profunda/Desânimo
    if (["triste", "mal", "ruim", "chorando", "choro", "sofrer", "desanimado", "deprimido"].some(w => text.includes(w))) {
        return conselhos.tristeza[Math.floor(Math.random() * conselhos.tristeza.length)];
    }

    // Detecção de Solidão
    if (["sozinho", "sozinha", "solitário", "ninguém", "só"].some(w => text.includes(w))) {
        return conselhos.solidao[Math.floor(Math.random() * conselhos.solidao.length)];
    }

    // Detecção de Ansiedade/Medo
    if (["medo", "ansioso", "ansiosa", "preocupado", "preocupada", "pânico"].some(w => text.includes(w))) {
        return conselhos.ansiedade[Math.floor(Math.random() * conselhos.ansiedade.length)];
    }

    // Agradecimento ou melhora
    if (["obrigado", "obrigada", "ajudou", "melhor"].some(w => text.includes(w))) {
        return "Fico muito feliz em saber que pude ajudar um pouquinho. Saiba que você é importante! ❤️";
    }

    return conselhos.fallback;}

function processUserInput() {
    const message = userInput.value.trim();
    if (!message) return;

    displayMessage("user", message);
    userInput.value = "";

    // Efeito de "O conselheiro está pensando..."
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "typing";
    typingIndicator.innerText = "O Hobot está digitando...";
    chatOutput.appendChild(typingIndicator);

    setTimeout(() => {
        typingIndicator.remove();
        const botReply = getBotResponse(message);
        displayMessage("bot", botReply);
    }, 3200); }

userInput.addEventListener("keyup", (e) => { if (e.key === "Enter") processUserInput(); });

// Mensagem inicial acolhedora
window.onload = () => {
    setTimeout(() => {
        displayMessage("bot", "Oi... percebi que você veio até aqui. Como está o seu coração hoje? Se quiser desabafar, sou todo ouvidos. ");
    }, 3200);
};