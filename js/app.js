const button = document.querySelector('.btn')
const image = document.querySelector('.img')
const url = "http://aws.random.cat/meow"


async function fetchHendler(){
    try {
        const respons = await fetch(url)
        const json = await respons.json()

        image.src = json.file
        console.log(json)
    } catch (error) {
        console.log(error)
    }
}


button.addEventListener('click', () => {
    let isLoad = image.complete

    if(isLoad){
        fetchHendler()
    }
    
})
