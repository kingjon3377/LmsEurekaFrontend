function addNavBar() {
  var navBar = document.createElement("div");
  navBar.setAttribute("class", "navBar");

  var logo = document.createElement("div");
  logo.setAttribute("class", "logo");

  var a = document.createElement("a");
  a.setAttribute("href", "index.html");

  var img = document.createElement("img");
  img.setAttribute("src", "../assets/logo.png");
  img.setAttribute("alt", "book");

  //nested div structure
  navBar.appendChild(logo).appendChild(a).appendChild(img);

  document.body.insertBefore(navBar, document.body.firstChild);
}
