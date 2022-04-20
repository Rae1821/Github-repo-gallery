//Targeting the div where my profile information will appear
const profile = document.querySelector(".overview");
//Github username
const username = "Rae1821";

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
    const avatar = data.avatar_url;
    const name = data.name;
    const bio = data.bio;
    const location = data.location;
    const publicRepos = data.public_repos;
    userInfo.innerHTML = 
    `<figure>
    <img alt="user avatar" src=${avatar} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Bio:</strong> ${bio}</p>
        <p><strong>Location</strong> ${location}</p>
        <p><strong>Number of public repos:</strong> ${publicRepos}</p>
    </div>`;
    profile.append(userInfo);
};