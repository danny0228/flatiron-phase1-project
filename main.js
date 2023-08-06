console.log("conectado!!")
let addPlayer = false;

document.addEventListener("DOMContentLoaded", () => {

    fetch("http://localhost:3000/barcelonaPlayers")
        .then(res => res.json())
        .then(renderPlayers)

    function renderPlayers(playerList) {
        playerList.forEach((player) => {
            renderCard(player)
        })
    }

    function renderCard(player) {
        const card = document.createElement('div')
        card.classList.add('card')

        const h2 = document.createElement('h2')
        h2.textContent = player.name

        const img = document.createElement('img')
        img.classList.add('player-avatar')
        img.src = player.image

        const p = document.createElement('p')
        p.innerHTML = `Age: ${player.age}<br>
        Number: ${player.jerseyNumber}<br>
        Preffered foot: ${player.preferredFoot}<br>
        National team: ${player.nationalTeam}<br>
        Position: ${player.position}`

        const p2 = document.createElement('p')
        p2.textContent = `${player.likes} likes`
        p2.setAttribute('id', 'p2')

        const button = document.createElement('button')
        button.classList.add('like-btn')
        button.setAttribute('id', `${player.id}`)
        button.textContent = 'Like ❤️'

        card.append(h2, img, p, p2, button)
        document.querySelector('#player-collection').appendChild(card)

        card.querySelector('.like-btn').addEventListener('click', () => {
            player.likes += 1
            card.querySelector('#p2').textContent = `${player.likes} likes`
            updateLikes(player)
        })
    }

    function updateLikes(playerList) {
        fetch(`http://localhost:3000/barcelonaPlayers/${playerList.id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(playerList)
        })
            .then(res => res.json())
            .then(player => console.log(player))
    }

    const addBtn = document.querySelector("#new-player-btn")
    const formContainer = document.querySelector(".container")
    const playerForm = document.querySelector(".add-favorite-player")

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        data.likes = 0

        fetch("http://localhost:3000/barcelonaPlayers", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => renderCard(data))
    })

    addBtn.addEventListener("click", () => {
        addPlayer = !addPlayer
        if (addPlayer) {
            formContainer.style.display = "block"
        } else {
            formContainer.style.display = "none"
        }
    })

})
