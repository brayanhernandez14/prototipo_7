let historyData = [];

async function sendPrompt() {
    const prompt = document.getElementById("prompt").value;
    const responseText = document.getElementById("responseText");

    const requestData = JSON.stringify({
        model: "llama2",
        prompt: "Solo puedes responder como si fueras un médico en menos de 25 palabras y dando una opinión como médico sobre lo que se debe hacer. Responde solo en español: " + prompt,
        stream: false
    });

    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestData
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();
        const responseContent = data.response || "No se recibió respuesta";
        responseText.textContent = responseContent;

        // Agregar al historial
        historyData.push({ pregunta: prompt, respuesta: responseContent });
    } catch (error) {
        responseText.textContent = `Error: ${error.message}`;
    }
}

function showChat() {
    const chatSection = document.getElementById("chatSection");
    const historySection = document.getElementById("history");
    chatSection.style.display = "block";
    historySection.style.display = "none";
}

function showHistory() {
    const chatSection = document.getElementById("chatSection");
    const historySection = document.getElementById("history");
    chatSection.style.display = "none";
    historySection.style.display = "block";

    displayHistory();
}

function displayHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    historyData.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = `Pregunta: ${entry.pregunta} - Respuesta: ${entry.respuesta}`;
        historyList.appendChild(listItem);
    });
}
