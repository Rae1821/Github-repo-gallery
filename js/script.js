//Targeting the div where my profile information will appear
const profile = document.querySelector(".overview");
//Github username
const username = "Rae1821";
//Targeting the unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
//Targeting section where all your repo information appears
const repoSection = document.querySelector(".repos");
//Targeting the section where the individual repo data will appear
const repoData = document.querySelector(".repo-data");


//Async function to fetch info from github profile
const profileInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    userData(data);
};
profileInfo();

//Fetch & Display User Information
const userData = function(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add(".user-info");
    userInfo.innerHTML = 
    `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    profile.append(userInfo);
    fetchRepos();
};

//Async function to fetch your repos
const fetchRepos = async function() {
    const res2 = await fetch(`https://api.github.com/users/${username}/repos?sort=created&per_page=100/`);
    const repos = await res2.json();
    console.log(repos);
    displayRepos(repos);
};

//Function to display info about your repos
const displayRepos = function(repos) {
    for(const list of repos) {
       const li = document.createElement("li");
       li.classList.add(".repo");
       li.innerHTML = `<h3>${list.name}</h3>`;
       repoList.append(li);
    }
};

//Create an event listener to check for a click event
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
        console.log(repoName);
    }
});

//Function to get specific repo info
const specificRepoInfo = async function (repoName) {
    const res3 = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res3.json();
    console.log(repoInfo);

    //grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    //make an array of languages
    const languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    console.log(languages);
    displayRepoInfo(repoInfo, languages);
};

//Function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const repoDiv = document.createElement("div");
    repoDiv.innerHTML = 
        `<h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on Github!</a>`
    repoData.append(repoDiv);
    repoData.classList.remove("hide");
    repoSection.classList.add("hide");
 };