```javascript
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const micButton = document.getElementById("micButton");
const clearButton = document.getElementById("clearButton");
const stopButton = document.getElementById("stopButton");

const chatBox = document.getElementById("chatBox");
const statusText = document.getElementById("status");

const sentimentElement = document.getElementById("sentiment");
const emotionElement = document.getElementById("emotion");
const wordCountElement = document.getElementById("wordCount");
const charCountElement = document.getElementById("charCount");


/* ================================
   SEND MESSAGE
================================ */

function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    addUserMessage(message);

    analyzeText(message);

    const reply = generateReply(message);

    setTimeout(() => {

        addBotMessage(reply);

        speak(reply);

    }, 500);

    messageInput.value = "";

}


/* ================================
   ADD USER MESSAGE
================================ */

function addUserMessage(message) {

    const messageDiv = document.createElement("div");

    messageDiv.className =
        "message user-message";

    messageDiv.innerHTML = `
        <div class="message-content">
            ${escapeHTML(message)}
        </div>

        <div class="avatar">
            👤
        </div>
    `;

    chatBox.appendChild(messageDiv);

    scrollChat();

}


/* ================================
   ADD BOT MESSAGE
================================ */

function addBotMessage(message) {

    const messageDiv = document.createElement("div");

    messageDiv.className =
        "message bot-message";

    messageDiv.innerHTML = `
        <div class="avatar">
            🤖
        </div>

        <div class="message-content">
            ${escapeHTML(message)}
        </div>
    `;

    chatBox.appendChild(messageDiv);

    scrollChat();

}


/* ================================
   TEXT ANALYSIS
================================ */

function analyzeText(text) {

    const words =
        text.match(/\b\w+\b/g) || [];

    const wordCount =
        words.length;

    const characterCount =
        text.length;


    const positiveWords = [
        "happy",
        "good",
        "great",
        "excellent",
        "awesome",
        "love",
        "nice",
        "wonderful",
        "amazing",
        "success",
        "thank",
        "best",
        "fun"
    ];


    const negativeWords = [
        "sad",
        "bad",
        "angry",
        "hate",
        "worst",
        "terrible",
        "poor",
        "upset",
        "failure",
        "problem",
        "boring",
        "disappointed"
    ];


    let positiveScore = 0;

    let negativeScore = 0;


    words.forEach(word => {

        const cleanWord =
            word.toLowerCase();

        if (positiveWords.includes(cleanWord)) {
            positiveScore++;
        }

        if (negativeWords.includes(cleanWord)) {
            negativeScore++;
        }

    });


    let sentiment;

    if (positiveScore > negativeScore) {

        sentiment = "Positive 😊";

    }
    else if (negativeScore > positiveScore) {

        sentiment = "Negative 😟";

    }
    else {

        sentiment = "Neutral 😐";

    }


    let emotion = "Neutral 😐";


    const lowerText =
        text.toLowerCase();


    if (
        lowerText.includes("happy") ||
        lowerText.includes("great") ||
        lowerText.includes("love") ||
        lowerText.includes("awesome")
    ) {

        emotion = "Happiness 😊";

    }
    else if (
        lowerText.includes("sad") ||
        lowerText.includes("upset") ||
        lowerText.includes("cry")
    ) {

        emotion = "Sadness 😢";

    }
    else if (
        lowerText.includes("angry") ||
        lowerText.includes("hate")
    ) {

        emotion = "Anger 😡";

    }
    else if (
        lowerText.includes("excited") ||
        lowerText.includes("amazing")
    ) {

        emotion = "Excitement 🤩";

    }


    sentimentElement.textContent =
        sentiment;

    emotionElement.textContent =
        emotion;

    wordCountElement.textContent =
        wordCount;

    charCountElement.textContent =
        characterCount;


    statusText.textContent =
        "Text analysis completed ✓";

}


/* ================================
   CHATBOT RESPONSE
================================ */

function generateReply(message) {

    const text =
        message.toLowerCase().trim();


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hello! 👋 Nice to meet you. How can I help you?";

    }


    if (text.includes("how are you")) {

        return "I'm doing great! 🤖 Thank you for asking.";

    }


    if (
        text.includes("your name") ||
        text.includes("who are you")
    ) {

        return "I am a Text and Speech Analysis Chatbot created using HTML, CSS and JavaScript.";

    }


    if (text.includes("what can you do")) {

        return "I can chat with you, analyze your text, detect basic sentiment and emotion, convert speech to text, and read my response aloud.";

    }


    if (text.includes("python")) {

        return "Python is a popular programming language used in AI, machine learning, web development and data science.";

    }


    if (
        text.includes("artificial intelligence") ||
        text === "ai"
    ) {

        return "Artificial Intelligence allows computers to perform tasks that normally require human intelligence.";

    }


    if (text.includes("cloud")) {

        return "Cloud computing provides services such as storage, computing power and applications through the internet.";

    }


    if (text.includes("project")) {

        return "This is a good mini-project because it combines chatbot functionality, text analysis and speech recognition.";

    }


    if (
        text.includes("thank") ||
        text.includes("thanks")
    ) {

        return "You're very welcome! 😊 I'm happy to help.";

    }


    if (
        text.includes("bye") ||
        text.includes("goodbye")
    ) {

        return "Goodbye! 👋 Have a wonderful day.";

    }


    if (
        text.includes("good") ||
        text.includes("great") ||
        text.includes("happy")
    ) {

        return "That's wonderful to hear! 😊 Your message has a positive sentiment.";

    }


    if (
        text.includes("sad") ||
        text.includes("bad") ||
        text.includes("upset")
    ) {

        return "I understand. Your message appears to have a negative sentiment. I'm here to listen.";

    }


    return "I understand your message. 😊 I have analyzed its words, characters, sentiment and basic emotion.";

}


/* ================================
   SPEECH RECOGNITION
================================ */

function startSpeechRecognition() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    recognition.lang = "en-US";

    recognition.continuous = false;

    recognition.interimResults = false;


    statusText.textContent =
        "🎤 Listening... Speak now";


    micButton.textContent =
        "🔴";


    recognition.start();


    recognition.onresult =
        function(event) {

            const speechText =
                event.results[0][0].transcript;


            messageInput.value =
                speechText;


            statusText.textContent =
                "Speech converted to text ✓";


            micButton.textContent =
                "🎤";


            sendMessage();

        };


    recognition.onerror =
        function(event) {

            statusText.textContent =
                "Speech error: " + event.error;


            micButton.textContent =
                "🎤";

        };


    recognition.onend =
        function() {

            micButton.textContent =
                "🎤";

        };

}


/* ================================
   TEXT TO SPEECH
================================ */

function speak(text) {

    if (!("speechSynthesis" in window)) {

        return;

    }


    window.speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang =
        "en-US";


    speech.rate =
        1;


    speech.pitch =
        1;


    window.speechSynthesis.speak(
        speech
    );

}


/* ================================
   STOP VOICE
================================ */

function stopVoice() {

    if ("speechSynthesis" in window) {

        window.speechSynthesis.cancel();

        statusText.textContent =
            "Voice stopped";

    }

}


/* ================================
   CLEAR CHAT
================================ */

function clearChat() {

    chatBox.innerHTML = `

        <div class="message bot-message">

            <div class="avatar">
                🤖
            </div>

            <div class="message-content">

                Chat cleared! 🧹

                <br><br>

                How can I help you?

            </div>

        </div>

    `;


    sentimentElement.textContent =
        "-";

    emotionElement.textContent =
        "-";

    wordCountElement.textContent =
        "0";

    charCountElement.textContent =
        "0";


    statusText.textContent =
        "Ready to chat";

}


/* ================================
   ENTER KEY
================================ */

messageInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


/* ================================
   BUTTON EVENTS
================================ */

sendButton.addEventListener(
    "click",
    sendMessage
);


micButton.addEventListener(
    "click",
    startSpeechRecognition
);


clearButton.addEventListener(
    "click",
    clearChat
);


stopButton.addEventListener(
    "click",
    stopVoice
);


/* ================================
   SECURITY
================================ */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* ================================
   SCROLL CHAT
================================ */

function scrollChat() {

    chatBox.scrollTop =
        chatBox.scrollHeight;

}
```
