const searchString = document.getElementById("search-string")
const button = document.getElementById("button")
const results = document.getElementById("results")

let myWatchList = []


async function postData(imdbID) {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=19e68f4b&i=${imdbID}`)
    const data = await resp.json()
    
    console.log(imdbID)
    results.innerHTML += `
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
                        <p class="watchlist" id="${imdbID}"><img class="pluss" src="./img/Pluss-icon.svg" />Watchlist</p>
                    </div>
                    <div class="plot">
                        <p>${data.Plot}
                    </div>
                </div>
            </div>
        `
        document.getElementById(imdbID).addEventListener("click", (e) => {
            e.preventDefault()
            console.log("button clicked - "+imdbID)
        })
        console.log(imdbID)
}

async function getMovielist(input) {
    const resp = await fetch(`https://www.omdbapi.com/?apikey=19e68f4b&s=${input}&page=10`)
    const data = await resp.json()
    
    if (data.Response === "False") {
        results.innerHTML = '<h3 class="empty">Unable to find what you’re looking for. Please try another search.</h3>'
    } else {
        results.innerHTML = ""
        for (let i=0; i<data.Search.length; i++) {
            postData(data.Search[i].imdbID)
        }
        
    }
}

button.addEventListener("click", (e) => {
    e.preventDefault()
    getMovielist(searchString.value)
})