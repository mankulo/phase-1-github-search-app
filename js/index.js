//document.addEventListener("DOMContentLoaded", function () => {
  //  const inputForm = document.querySelector("form")
    //inputForm.addEventListener("submit", )
//})

document.addEventListener('DOMContentLoaded', () => {
    const inputForm = document.querySelector("form");
    const userList = document.querySelector('#user-list');
    const reposList = document.querySelector('#repos-list');
  
    inputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const inputValue = document.querySelector('input#search').value;
  
      fetch(`https://api.github.com/search/users?q=${inputValue}`)
        .then(resp => resp.json())
        .then(data => displayUsernames(data.items))
        .catch(error => console.error('Error:', error));
    });
  
    function displayUsernames(users) {
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      users.forEach(user => {
        const listItem = document.createElement('li');
        const userLink = document.createElement('a');
        userLink.textContent = user.login;
        userLink.href = user.html_url;
        userLink.target = '_blank'; // Open link in a new tab
  
        // Add a click event listener to each user link
        userLink.addEventListener('click', (event) => {
          event.preventDefault();
          fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(resp => resp.json())
            .then(repos => displayRepos(repos))
            .catch(error => console.error('Error:', error));
        });
  
        listItem.appendChild(userLink);
        userList.appendChild(listItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
  
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        const repoLink = document.createElement('a');
        repoLink.textContent = repo.name;
        repoLink.href = repo.html_url;
        repoLink.target = '_blank'; // Open link in a new tab
        listItem.appendChild(repoLink);
        reposList.appendChild(listItem);
      });
    }
  });
  