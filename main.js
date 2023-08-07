let addPlayer = false;

document.addEventListener("DOMContentLoaded", () => {
    //fetch all the info from the json
    fetch("http://localhost:3000/barcelonaPlayers")
        .then(res => res.json())
        .then(renderPlayers)
    //use the renderPlayers function to call a forEach iteration for every object in the json 
    function renderPlayers(playerList) {
        playerList.forEach((player) => {
            renderCard(player)
        })
    }
    //use the renderCard function to create a card and their respective html elements for each object in the json
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
        //put all the images in a variable and then iterating over all of them to add an event listener that will change their size and bring it back to normal
        let images = document.querySelectorAll('img')
        images.forEach(image => {
            image.addEventListener('mouseover', () => {
                image.style.width = '50%'
            })
            image.addEventListener('mouseout', () => {
                image.style.width = '35%'
            })
        })
    }
    // use the updateLikes function to call a fetch with a PATCH method to change the number of likes in the DOM and the json without having to reload the application, and to make sure even when the application is reloaded the changes will stay
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
    //adding an event listener to the form to create a new card based on the information submitted by the user
    playerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        data.likes = 0
        //use a fetch with a POST method in order to have the new card in the DOM and added in the json 
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
    //add an event listener to a button, to have the option to hide or show the form as needed
    addBtn.addEventListener("click", () => {
        addPlayer = !addPlayer
        if (addPlayer) {
            formContainer.style.display = "block"
        } else {
            formContainer.style.display = "none"
        }
    })

})
