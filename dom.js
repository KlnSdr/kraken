"use strict";
function clearBody() {
    document.body.innerHTML = "";
    var menuBar = document.createElement('div');
    menuBar.id = "bottomMenu";
    menuBar.classList.add("toolbarBottom");
    document.body.appendChild(menuBar);
}
function setBottomMenuBar(type, actionBttnLeft, actionBttnMiddle, actionBttnRight) {
    switch (type) {
        case 0 /* home */:
            // <button class="fa fa-list menuButton"></button>
            // <button class="fa fa-plus menuButton"></button>
            // <button class="fa fa-question menuButton"></button>
            var container = document.getElementById("bottomMenu");
            var left = document.createElement("button");
            left.className = "menuButton";
            var middle = document.createElement("button");
            middle.className = "fa fa-plus menuButton";
            if (actionBttnLeft == undefined) {
                middle.addEventListener('click', function () {
                    var newField = new newfield("neues Datenfeld");
                    newField.create();
                    newField.attach(document.body);
                });
            }
            else {
                middle.addEventListener('click', actionBttnLeft);
            }
            var right = document.createElement("button");
            right.className = "menuButton";
            container.innerHTML = "";
            container.appendChild(left);
            container.appendChild(middle);
            container.appendChild(right);
            break;
        case 1 /* details */:
            // <button class="fa fa-list menuButton"></button>
            // <button class="fa fa-plus menuButton"></button>
            // <button class="fa fa-question menuButton"></button>
            var container = document.getElementById("bottomMenu");
            var left = document.createElement("button");
            left.className = "fa fa-arrow-left menuButton";
            if (actionBttnLeft == undefined) {
                left.addEventListener("click", function () {
                    console.log("back home");
                    clearBody();
                    setBottomMenuBar(0 /* home */);
                    setup();
                });
            }
            else {
                left.addEventListener("click", actionBttnLeft);
            }
            var middle = document.createElement("button");
            middle.className = "fa fa-plus menuButton";
            if (actionBttnMiddle == undefined) {
                middle.addEventListener("click", function () {
                    console.log("add entry");
                });
            }
            else {
                middle.addEventListener('click', actionBttnMiddle);
            }
            var right = document.createElement("button");
            right.className = "menuButton";
            container.innerHTML = "";
            container.appendChild(left);
            container.appendChild(middle);
            container.appendChild(right);
            break;
        case 2 /* add */:
            // <button class="fa fa-list menuButton"></button>
            // <button class="fa fa-plus menuButton"></button>
            // <button class="fa fa-question menuButton"></button>
            var container = document.getElementById("bottomMenu");
            var left = document.createElement("button");
            left.className = "fa fa-home menuButton";
            if (actionBttnLeft == undefined) {
                left.addEventListener("click", function () {
                    console.log("back home");
                    clearBody();
                    setBottomMenuBar(0 /* home */);
                    setup();
                });
            }
            else {
                left.addEventListener('click', actionBttnLeft);
            }
            var middle = document.createElement("button");
            middle.className = "fa fa-save menuButton";
            middle.style.color = "#0f0";
            if (actionBttnMiddle == undefined) {
                middle.addEventListener("click", function () {
                    console.log("save entry");
                });
            }
            else {
                middle.addEventListener('click', actionBttnMiddle);
            }
            var right = document.createElement("button");
            right.className = "fa fa-times menuButton";
            right.style.color = "red";
            if (actionBttnRight == undefined) {
                right.addEventListener("click", function () {
                    console.log("discard");
                });
            }
            else {
                right.addEventListener('click', actionBttnRight);
            }
            container.innerHTML = "";
            container.appendChild(left);
            container.appendChild(middle);
            container.appendChild(right);
            break;
        default:
            break;
    }
}
