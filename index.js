function displayCommits(){
  let commits = JSON.parse(this.responseText);
  let commitList = `<ul>${commits.map(c => '<li>' + c.commit.author.name + ' - ' + c.committer.login + ' - ' + c.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitList;
}

function displayBranches(){
  let branches = JSON.parse(this.responseText);
  // debugger;
  let branchList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchList;
}


function getBranches(element) {
  let username = element.dataset.username;
  let repo = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  let url = "https://api.github.com/repos/" + username + "/" + repo + "/branches";
  req.open("GET", url);
  req.send();
}


function getCommits(element) {
  let username = element.dataset.username;
  let repo = element.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  let url = "https://api.github.com/repos/" + username + "/" + repo + "/commits";
  req.open("GET", url);
  req.send();
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  let repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - <a href="' +
    repo.html_url + '">' + repo.html_url + '</a> - <a href="#" data-repository="' +
    repo.name + '" data-username="' + repo.owner.login +
    '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' +
    repo.name + '" data-username="' + repo.owner.login +
    '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  let username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  let url = "https://api.github.com/users/" + username + "/repos";
  req.open("GET", url);
  req.send();
}
