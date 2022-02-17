const form = document.querySelector('#form')
const input_text= document.querySelector('#input-text')
const cardContainer = document.querySelector('.card')

const URL = 'https://api.github.com/users/'
// const FULL_URL = URL + 'pandeyaman';

async function fetchDetails(url){
    const response = await fetch(url);
    const responseData = await response.json();
    if(response.status == "200"){
        buildCard(responseData)
        fetchRepoList(url+"/repos")
    }
    else{
        buildErrorCard()
    }
   
}

async function fetchRepoList(url){
    const response = await fetch(url);
    const responseData = await response.json();
    buildRepoList(responseData);
}

function buildCard(data){
    const cardElement = `
        <div class='card-avatar'>
            <img src='${data.avatar_url}' class='avatar'></img>
        </div>
        <div class='card-info'>
            <p class='username'>${data.name}</p>
            <p class='company'>${data.company}</p>
            <p class='bio'>${data.bio}</p>
            <ul class='card-list'>
                <li>${data.followers} Followers</li>
                <li>${data.following} Following</li>
                <li>${data.public_repos} Repos</li>
            </ul>
            <ul id="repos">
            </ul>
        </div>
    `
    cardContainer.innerHTML = cardElement;    
}

function buildRepoList(data){
    const repoElement = document.querySelector('#repos')
    data.slice(0,5).forEach(repo => {
        const repoLink = document.createElement('a')
        repoLink.href = repo.html_url;
        repoLink.target = '_blank';
        repoLink.innerText=repo.name
        repoLink.classList.add('repos')
        repoElement.appendChild(repoLink)
    });
}

function buildErrorCard(){
    const cardElement = `
    <div class='card-info'>
        <p class='error-text'>Oops! No user found</p>
    </div>
`
cardContainer.innerHTML = cardElement; 
}

form.addEventListener('submit',(e) => {
    e.preventDefault()
    fetchDetails(URL+input_text.value)
    input_text.value="";
})






