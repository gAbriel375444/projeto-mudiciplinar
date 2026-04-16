// dicionário de respostas
const respostas = {
    "oi": "Oi, tudo bem com você?",
    "olá": "Olá, tudo bem com você?",
    "tudo bem": "Que bom! Quer conversar sobre algo?"
};

//botão para enviar a mensagem
let botao_enviar_mensagem = document.getElementById("enviar_mensagem");

//ao clicar no botão
botao_enviar_mensagem.addEventListener("click", function () {
    
    //pego id do meu texto e salvo numa var
    const input = document.getElementById("meu_texto").value.trim().toLowerCase();

    //no meu index, criei um p para aparecer a resposta na tela
    //aqui estou pegando o id desse <p> 
    const respostaElemento = document.getElementById("resposta");

    //se a respota digitada for valida (está dentro do dicionario)
    if (respostas[input])
    {
        
        //ele escreve a resposta correspondente 
        //e faz aparecer na tela atraves do <p>
        respostaElemento.innerText = respostas[input];

    } 
    
    else //se não
    {

        //ele retorna isso
        respostaElemento.innerText = "Não entendi a pergunta.";
    }
});