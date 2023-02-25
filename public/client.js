const socket = io()

let msgArea = document.querySelector(".msgArea");
let msginput = document.getElementById("textmsg")
let btn = document.getElementById("sendmsg")


const name = prompt("enter oyur name")
appendUser("You");


socket.emit('new-user-joined',name)
socket.on('user-joined',nm =>{
    appendUser(nm);
})

socket.on("sendmsg",msg=>{
    appendmsg(msg,"incoming")
})

function appendUser(nm){
    let el = document.createElement("div")
    el.classList.add("joinmsg")
    el.innerHTML = nm+" joined The chat"
    msgArea.appendChild(el)
}

function appendmsg(msg,type){
    let inmsg = document.createElement("div")
    inmsg.classList.add(type)
    inmsg.innerText = msg.uname+ " : "+msg.text;
    msgArea.appendChild(inmsg)
    scrollToTop()
}

msginput.addEventListener("keypress",(event)=>{
    if(event.key === "Enter"){
        message = {text: msginput.value.trim(),
            uname : name
        }
        msginput.value='';
        socket.emit("outgoing",message)
        message.uname = "You";
        appendmsg(message,"outgoing")
    
    }
})


btn.addEventListener("click",()=>{
    message = {text: msginput.value.trim(),
        uname : name
    }
    msginput.value='';
    socket.emit("outgoing",message)
    message.uname = "You";
    appendmsg(message,"outgoing")
    
})

function scrollToTop(){
    msgArea.scrollTop = msgArea.scrollHeight;
}