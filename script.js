    let btn=document.querySelector("#btn")
    let content=document.querySelector("#content")
    let voice= document.querySelector("#voice")
    function speak(text){
        let text_speak=new SpeechSynthesisUtterance(text)
        text_speak.rate=1
        text_speak.pitch=1
        text_speak.volume=1
        text_speak.lang = "en-US"
        window.speechSynthesis.speak(text_speak)
    }
    function wishMe(){
        let day=new Date()
    let hours= day.getHours()
    if(hours>=0 && hours<12){
        speak("good morning sir! how may i help?")
    }
    else if(hours>=12 && hours<16){
        speak("good afternoon sir! how may i help?")
    }else{
        speak("good evening sir! how may i help?")
    }
    }
    window.addEventListener('load',()=>{
        wishMe()
    })
    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult=(event)=>{
            let currentIndex=event.resultIndex
            let transcript= event.results[currentIndex][0].transcript
            content.innerText=transcript
            takeCommand(transcript.toLowerCase())
    }
    btn.addEventListener("click",()=>{
            recognition.start()
            btn.style.display = "none"
            voice.style.display="block"
    })
    function takeCommand(message){
            btn.style.display = "flex"
            voice.style.display="none"
            if(message.includes("hello")||message.includes("hey") || message.includes("hi")){
                speak("hello sir,What can i help with ?")
            }
            else if(message.includes("who are you")||message.includes("who are you john")){
                speak("i am john! a virtual assistant ,i'm here to assist you!")
            }else if(message.includes("what is your name")||message.includes("name")){
                speak("my name is John !")
            }else if(message.includes("what can you do")||message.includes("how can you help")){
                speak("I'm here to assist you by taking your commands to answer your questions and perform tasks accordingly")
            }else if(message.includes("tell me a joke ")||message.includes("joke")){
                speak("Why! don't EGGS tell jokes.....  Because. they'd crack each other .up")
            }
            else if(message.includes("open youtube")){
                speak("opening youtube...")
                window.open("https://youtube.com/","_blank")
            }else if(message.includes("open facebook")){
                speak("opening facebook...")
                window.open("https://facebook.com/","_blank")
            }else if(message.includes("open lnkedin")){
                speak("opening linkedin...")
                window.open("Linkedin://")
            }else if(message.includes("open instagram")){
                speak("opening instagram...")
                window.open("https://instagram.com/","_blank")
            }else if(message.includes("open google")){
                speak("opening google...")
                window.open("https://google.com/","_blank")
            }else if(message.includes("open whatsapp")){
                speak("opening whatsapp...")
                window.open("whatsapp://")
            }else if(message.includes("open calculator")){
                speak("opening calculator...")
                window.open("Calculator://")
            }else if(message.includes("open settings")){
                speak("opening settings...")
                window.open("settings://")
            }else if(message.includes("how are you")||message.includes("how are you john?")){
                speak("I'm fine sir, how may i help?")
                
            }else if(message.includes("time")){
                let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
                speak(time)
            }else if(message.includes("date")){
                let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
                speak(date)
            }
            else{
                let finalText="this is what i found on internet regarding "+message.replace("john","")|| message.replace("jon","")
                speak(finalText)
                window.open(`https://www.google.com/search?q=${message.replace("John","")}`,"_blank")
            }
        
    }   