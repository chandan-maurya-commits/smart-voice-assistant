let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

let availableVoices = []

window.speechSynthesis.onvoiceschanged = () => {
    availableVoices = window.speechSynthesis.getVoices()
}

// ================= SPEAK FUNCTION =================
function speak(text){
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = "en-IN"

    let maleVoice = availableVoices.find(voice =>
        voice.name.includes("David") || 
        voice.name.includes("Mark") ||
        voice.name.includes("Male")
    )

    if(maleVoice){
        utter.voice = maleVoice
    }

    window.speechSynthesis.speak(utter)
}



// ================= WISH =================
function wishMe(){
    let hour = new Date().getHours()
    let name = localStorage.getItem("username")

    if(hour < 12){
        speak(`Good morning ${name || "sir"}!`)
    }
    else if(hour < 17){
        speak(`Good afternoon ${name || "sir"}!`)
    }
    else{
        speak(`Good evening ${name || "sir"}!`)
    }
}

window.addEventListener("load", wishMe)

// ================= SPEECH RECOGNITION =================
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new SpeechRecognition()

recognition.lang = "en-IN"
recognition.continuous = false

recognition.onresult = (event)=>{
    let transcript = event.results[0][0].transcript.toLowerCase().trim()
    content.innerText = transcript
    processCommand(transcript)
}

btn.addEventListener("click", ()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

// ================= KNOWLEDGE BASE =================
const knowledgeBase = {
    "capital of india": "The capital of India is New Delhi.",
    "largest planet": "Jupiter is the largest planet in our solar system.",
    "who created you": "I was created by Chandan Maurya.",
    "what is javascript": "JavaScript is a programming language used to build interactive websites.",
    "what is python": "Python is a powerful and beginner friendly programming language.",
    "what is artificial intelligence": "Artificial Intelligence is the simulation of human intelligence in machines.",
    "what is data structure": "Data structure is a way to organize and store data efficiently.",
    "what is django": "Django is a high-level Python web framework.",
    "who is apj abdul kalam": "Doctor APJ Abdul Kalam was a former president of India and a great scientist.",
    "who is elon musk": "Elon Musk is a technology entrepreneur and CEO of Tesla and SpaceX."
}

// ================= GREETINGS =================
const greetings = [
    "hi","hello","hey","good morning","good evening",
    "good afternoon","yo","namaste","what's up"
]

// ================= MOODS =================
const moods = {
    "sad": "I'm sorry you're feeling sad. Tough times never last, but tough people do.",
    "happy": "That’s wonderful! Keep smiling.",
    "tired": "You should take a short break and refresh your mind.",
    "bored": "Would you like to hear a joke or a fun fact?",
    "stressed": "Take a deep breath. Everything will be fine."
}

// ================= PROCESS COMMAND =================
function processCommand(message){

    btn.style.display = "flex"
    voice.style.display = "none"

    // ===== GREETING CHECK =====
    if(greetings.some(word => message.includes(word))){
        let name = localStorage.getItem("username")
        speak(`Hello ${name || "sir"}! How can I assist you today?`)
        return
    }

    // ===== STORE NAME =====
    if(message.startsWith("my name is")){
        let name = message.replace("my name is","").trim()
        localStorage.setItem("username", name)
        speak(`Nice to meet you ${name}. I will remember your name.`)
        return
    }

    // ===== MOOD CHECK =====
    for(let mood in moods){
        if(message.includes(mood)){
            speak(moods[mood])
            return
        }
    }

    // ===== THANK YOU =====
    if(message.includes("thank you") || message.includes("thanks")){
        speak("You're always welcome.")
        return
    }

    // ===== TIME & DATE =====
    if(message.includes("time")){
        speak("The current time is " + new Date().toLocaleTimeString())
        return
    }

    if(message.includes("date")){
        speak("Today's date is " + new Date().toLocaleDateString())
        return
    }

    // ===== CALCULATOR =====
    if(message.startsWith("calculate")){
        let exp = message.replace("calculate","")
        try{
            let result = eval(exp)
            speak("The result is " + result)
        }catch{
            speak("Sorry, I couldn't calculate that.")
        }
        return
    }

    // ===== WEBSITE COMMANDS =====
    const sites = {
        "open youtube": "https://youtube.com",
        "open google": "https://google.com",
        "open github": "https://github.com",
        "open linkedin": "https://linkedin.com",
        "open instagram": "https://instagram.com",
        "open facebook": "https://facebook.com",
        "open whatsapp": "https://web.whatsapp.com"
    }

    for(let key in sites){
        if(message.includes(key)){
            speak("Opening " + key.replace("open ",""))
            window.open(sites[key], "_blank")
            return
        }
    }

    // ===== PLAY MUSIC =====
    if(message.startsWith("play")){
        let song = message.replace("play","")
        speak("Playing " + song)
        window.open(`https://www.youtube.com/results?search_query=${song}`, "_blank")
        return
    }

    // ===== KNOWLEDGE BASE SEARCH =====
    for(let key in knowledgeBase){
        if(message.includes(key)){
            speak(knowledgeBase[key])
            return
        }
    }

    // ===== SMART QUESTION DETECTION =====
    if(message.startsWith("what") || message.startsWith("who") || message.startsWith("how") || message.startsWith("why")){
        speak("That's an interesting question. Let me search that for you.")
        setTimeout(()=>{
            window.open(`https://www.google.com/search?q=${message}`, "_blank")
        },1500)
        return
    }

    // ===== DEFAULT RESPONSE =====
    speak("I'm not trained for that yet, but I'm learning every day.")
}
