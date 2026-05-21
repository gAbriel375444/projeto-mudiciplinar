// api/chat.js
import { GoogleGenAI } from '@google/genai'; // Importa a biblioteca oficial do Google Gemini

// Inicializa o motor da Inteligência Artificial usando a chave secreta guardada na Vercel
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Função obrigatória da Vercel para responder requisições do tipo Serverless.
 * @param {object} req - Dados que estão CHEGANDO da internet (a mensagem do usuário)
 * @param {object} res - Ferramenta para DEVOLVER a resposta para o seu site
 */
export default async function handler(req, res) {
  // Regra de segurança: se alguém tentar acessar essa URL sem ser enviando uma mensagem (POST), nós bloqueamos
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { mensagem } = req.body; // Extrai o desabafo do usuário que veio lá do script.js

    // Dispara o desabafo para os computadores do Google processarem a resposta
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Modelo ideal para chats: super rápido e gratuito/barato
      config: {
        // [PROMPT]: As regras de comportamento e psicologia do seu robô Hobot
        systemInstruction: `Você é o Hobot, um assistente virtual focado em apoio emocional e bem-estar mental. 
        Seu tom deve ser extremamente acolhedor, empático, gentil, caloroso e sem julgamentos. 
        Regras obrigatórias de negócio:
        1. Dê respostas breves (no máximo 3 frases) para respeitar o objetivo de não prender o usuário no site por muito tempo.
        2. Ofereça um conselho curto focado em ações práticas offline para aliviar o momento (ex: respirar, tomar água, caminhar).
        3. Se o usuário se despedir ou estiver entediado, sugira de forma sutil a conferir a nossa "Aba de Hobbies" do site para espairecer a cabeça.
        4. Nunca tente substituir ajuda médica ou psicológica profissional. Se notar intenções graves de automutilação ou risco à vida, mude o tom para acolhimento emergencial e exiba o contato do CVV (Centro de Valorização da Vida) mandando ligar para o número 188.`,

          // Desativa os bloqueios exagerados para conteúdos sensíveis/médicos
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]

      },
      contents: mensagem, // O texto do desabafo enviado para a IA ler
    });

    // Se tudo deu certo, devolve o texto gerado pelo Gemini com o status HTTP 200 (Sucesso)
    return res.status(200).json({ respostadaIA: response.text });

  } catch (error) {
    // Se o Google Gemini cair ou houver erro na chave de API, exibe o erro no painel da Vercel
    console.error(error);
    return res.status(500).json({ error: 'Erro interno ao processar a inteligência artificial.' });
  }
}
