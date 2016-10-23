function getRepositories() {
  let username = document.querySelector("#username").value;
  let url = `https://api.github.com/users/${username}/repos`;
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayRepositories)
  request.open('GET', url)
  request.send()
}

function displayRepositories(event, data){
  const repos = JSON.parse(this.responseText)
  let reposList = `<ul>${repos.map(r => '<li>' + r.html_url + ' - <a href="#" data-repository="' +
  r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`;

  document.getElementById("repositories").innerHTML = reposList;
}

function getCommits(el) {
  let owner = document.querySelector("#username").value
  let repo = el.dataset.repository
  let url = `https://api.github.com/repos/${owner}/${repo}/commits`;
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayCommits)
  request.open('GET', url)
  request.send()
}

function displayCommits(event, data){
  const commits = JSON.parse(this.responseText)
  let reposList = `<ul>${commits.map(commit => '<li>' + commit.author.login +
  commit.commit.message + commit.commit.author.name + '</li>').join('')}</ul>`;

  document.getElementById("details").innerHTML = reposList;
}


function getBranches(el) {
  let username = document.querySelector("#username").value;
  let repo = el.dataset.repository;
  let url = `https://api.github.com/repos/${username}/${repo}/branches`;
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayBranches)
  request.open('GET', url)
  request.send()
}

function displayBranches(event, data){
  const branches = JSON.parse(this.responseText)
  let branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;

  document.getElementById("details").innerHTML = branchesList;
}