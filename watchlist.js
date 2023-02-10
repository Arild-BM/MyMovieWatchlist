const results = document.getElementById("results")

let number = 0

function postData(imdbID) {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=19e68f4b&i=${imdbID}`)
    const data = await resp.json()
    console.log(imdbID)
    console.log(data.imdbRating)
    
    results.innerHTML = `
            <div class="post">    
                <img class="result-image" src="${data.Poster !== "N/A" ? data.Poster : "./img/Icon.svg"}" />
                <div class="text">
                    <div class="heading">
                        <h2 class="title">${data.Title}</h2>
                        <img class="star" src="./img/Star.svg" />
                        <p class="rating">${data.imdbRating}</p>
                    </div>
                    <div class="info">
                        <p class="runtime">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <p class="watchlist"><img class="pluss" src="./img/Pluss-icon.svg" />Watchlist</p>
                    </div>
                    <div class="plot">
                        <p>${data.Plot}
                    </div>
                </div>
            </div>
            ${results.innerHTML}
        `
}

async function getMovielist(input) {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=19e68f4b&s=${input}&page=10`)
    const data = await resp.json()
    
    if (data.Response !== "False") {
        console.log(data)

        if (number === 0) {
            results.innerHTML = ""
        }
        number++
        console.log(data.Search.length)
        for (let x=0; x<data.Search.length; x++) {
            postData(data.Search[x].imdbID)
        }
    }
}

button.addEventListener("click", (e) => {
    e.preventDefault()
    getMovielist(searchString.value)
})