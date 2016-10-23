// function getCommits() {
//   const req = new XMLHttpRequest()
//   jjjjjjjj
//   req.open("GET", 'https://api.github.com/users/' + username +
// }
// function displayCommits() {
//   commits = 
//   document.getElementById("details").innerHTML(commits)
// }

function getRepositories() {
  var username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("Get", `https://api.github.com/users/${username}/repos`)
    req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.html_url +  + ' - <a href="#" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

  function getCommits(el) {
    var username = document.getElementById("username").value
    const name = el.dataset.repository
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits);
    req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
      req.send()
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + commit.commit.message + commit.commit.author.name + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
  }

function getBranches(el) {
    var username = document.getElementById("username").value
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
    req.addEventListener("load", displayBranches);
    req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
      req.send()
}

  function displayBranches() {
    const branches = JSON.parse(this.responseText)
    const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = branchesList

  }

