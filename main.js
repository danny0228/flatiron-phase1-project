console.log("conectado!!")

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
        p.textContent = `age: ${player.age}
        number: ${player.jerseyNumber}
        preffered foot: ${player.preferredFoot}
        national team: ${player.nationalTeam}
        position: ${player.position}`

        const button = document.createElement('button')
        button.classList.add('like-btn')
        button.setAttribute('id', `${player.id}`)
        button.textContent = 'Like ❤️'

        card.append(h2, img, p, button)
        document.querySelector('#player-collection').appendChild(card)
    }
})