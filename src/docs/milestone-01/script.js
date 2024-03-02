let count = 0
const speech = [
    "My favorite singer is Laufey",
    "Junia is also good",
    "Laufey pronounce Louivei not lofi",
    "And also not Lau-fey",
    "...",
    "...",
    "...",
    "Why are you still here",
    "If you also like Laufey then we will keep the conversation",
    "...",
    "Just leave there is nothing more",
    "...",
    "...",
    "...",
    "Okay fine I think she is better than Taylor Swift okay?",
    "Prettier, funnier",
    "Now you can leave",
    "Bye!",
    "...",
    "...",
    "...",
    "I am not chatGPT to generate many thing for you",
    "Bye for realll",
    "...",
    "...",
    "...",
    "..."
]

const p = document.getElementById("team")
const butt = document.getElementById("butt")

p.addEventListener("click", () => {
    console.log(p.children[0])
    p.children[0].textContent = "Team members (with an S I'm sorry)"
})

butt.addEventListener("click", () => {
    console.log(document.getElementById("Laufey"))
    if (!!document.getElementById("Laufey")) {
        document.getElementById("Laufey").textContent = speech[count % speech.length]
    } else {
        const newDiv = document.createElement("p")
        newDiv.id = "Laufey"

        const newContent = document.createTextNode(speech[count % speech.length])

        newDiv.appendChild(newContent)

        const currentDiv = document.getElementById("content-minh")

        currentDiv.parentNode.insertBefore(newDiv, currentDiv.nextSibling)

    }
    console.log(count)
    count += 1
})

const addElement = () => {
    const newDiv = document.createElement("div")

    const newContent = document.createTextNode("That's all about us")

    newDiv.appendChild(newContent)

    const currentDiv = document.getElementsByTagName("aside")[0]

    console.log(currentDiv)

    currentDiv.parentNode.insertBefore(newDiv, currentDiv);
}
document.body.onload = addElement