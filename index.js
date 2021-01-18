function displayCommits(event, data) {
  var commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commits.map(c => `<li>${c.commit.author.name} ${c.author.login} ${c.commit.message}</li>`)}</ul>`
  document.getElementById('details').innerHTML = commitList
}

function displayBranches(event, data) {
  var branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => `<li>${b.name}</li>`)}</ul>`
  document.getElementById('details').innerHTML = branchList
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => `<li>${r.name} ${r.owner.login} ${r.html_url} <a href="#" data-repo="' + ${r.name} + '" onclick="getCommits(this)">Get Commits</a> </li>`)}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const user = document.getElementById('username').value
  req.addEventListener('load', displayRepositories);
  req.open("GET", `https://api.github.com/users/` + user + `/repos`)
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${el.dataset.username}/` + name + '/commits')
  req.send()
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${el.dataset.username}/` + el.dataset.repository + '/branches')
  req.send()
}
