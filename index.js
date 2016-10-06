function getRepositories() {
  // var link = "https://api.github.com/users/octocat/repos";
  var link = "https://api.github.com/users/";
  var uname = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", link+uname+'/repos');
  req.send();
}

function displayRepositories(event,data) {
  var arr = JSON.parse(this.response)
  var tmp = '<ul>';
  for (var i = 0, len = arr.length; i < len; i++) {
    var tmp2 = `<p><a href="${arr[i].html_url}">${arr[i].html_url}</a></p>\
        <p><a href="#" data-repo="${arr[i].commits_url}" onclick="getCommits(this)">Get Commits</a></p>\
        <p><a href="#" data-repo="${arr[i].branches_url}"onclick="getBranches(this)">Get Branches</a></p>`;
    tmp += `<li>${arr[i].name}${tmp2}</li>`;
  }
  tmp += '</ul>';
  document.getElementById('repositories').innerHTML = tmp;
}

function displayCommits(event,data) {
  var arr = JSON.parse(this.response)
  var tmp = '<ul>';
  for (var i = 0, len = arr.length; i < len; i++) {
    var tmp2 = `<p>${arr[i].commit.message}</p>`;
    tmp += `<li>${arr[i].commit.author.name + ', ' + arr[i].author.login}${tmp2}</li>`;
  }
  tmp += '</ul>';
  document.getElementById('details').innerHTML = tmp;
}

function displayBranches(event,data) {
  var arr = JSON.parse(this.response)
  var tmp = '<ul>';
  for (var i = 0, len = arr.length; i < len; i++) {
    var tmp2 = `<p>${arr[i].commit.message}</p>`;
    tmp += `<li>${arr[i].name}</li>`;
  }
  tmp += '</ul>';
  document.getElementById('details').innerHTML = tmp;
}

function getCommits(arg) {
  var url = arg.dataset.repo.replace("{/sha}","");
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", url);
  req.send();
}

function getBranches(arg) {
  var url = arg.dataset.repo.replace("{/branch}","");
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", url);
  req.send();
}
