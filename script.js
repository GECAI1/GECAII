async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value;
    if (message.trim() === "") return;

    // Affiche le message de l'utilisateur dans la boîte de discussion
    displayMessage(message, "user");

    // Vide le champ de saisie
    userInput.value = "";

    // Affiche un message de type "en cours de traitement"
    const processingMessageId = displayMessage("En cours de traitement...", "ai");

    try {
        // Obtenir la réponse de GECAI
        const aiResponse = await getAIResponse(message);

        // Remplace le message de type "en cours de traitement" par la réponse de GECAI
        updateMessage(processingMessageId, aiResponse, "ai");
    } catch (error) {
        console.error("Error fetching AI response:", error);
        // Remplace le message de type "en cours de traitement" par un message d'erreur
        updateMessage(processingMessageId, "Une erreur est survenue. Veuillez réessayer.", "ai");
    }
}

// Fonction pour afficher un message dans la boîte de discussion
function displayMessage(message, sender) {
    const chatbox = document.getElementById("chatbox");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = (sender === "user" ? "Toi: " : "GECAI: ") + message;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;

    return messageElement;
}

// Fonction pour mettre à jour un message existant dans la boîte de discussion
function updateMessage(messageElement, newMessage, sender) {
    messageElement.textContent = (sender === "user" ? "Toi: " : "GECAI: ") + newMessage;
}

// Fonction pour obtenir une réponse de GECAI (à remplacer par un appel à une API réelle)
async function getAIResponse(message) {
    // Remplace "YOUR_OPENAI_API_KEY" par ta clé API OpenAI
    const apiKey = "YOUR_OPENAI_API_KEY";  // <-- C'est ici que tu mets ta clé API

    const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`  // Utilise ta clé API ici
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 150
        })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.choices[0].text.trim();
}
