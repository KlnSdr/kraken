const enum menu {
    home,
    details,
    add
}

function clearBody() {
    document.body.innerHTML = "";

    const menuBar: HTMLDivElement = document.createElement('div');
    menuBar.id = "bottomMenu";
    menuBar.classList.add("toolbarBottom");

    document.body.appendChild(menuBar);
}


function setBottomMenuBar(type: menu, actionBttnLeft?: () => void, actionBttnMiddle?: () => void, actionBttnRight?: () => void) {
    switch (type) {
        case menu.home:
            // <button class="fa fa-list menuButton"></button>
            // <button class="fa fa-plus menuButton"></button>
            // <button class="fa fa-question menuButton"></button>
            var container: HTMLDivElement = (document.getElementById("bottomMenu") as HTMLDivElement);

            var left: HTMLButtonElement = document.createElement("button");
            left.className = "menuButton";

            var middle: HTMLButtonElement = document.createElement("button");
            middle.className = "fa fa-plus menuButton";
            if (actionBttnLeft == undefined) {
                middle.addEventListener('click', () => {
                    const newField: newfield = new newfield("neues Datenfeld");
                    newField.create();
                    newField.attach(document.body);
                });
            } else {
                middle.addEventListener('click', actionBttnLeft);
            }

            var right: HTMLButtonElement = document.createElement("button");
            right.className = "menuButton";

            container.innerHTML = "";

            container.appendChild(left);
            container.appendChild(middle);
            container.appendChild(right);
            break;

        case menu.details:
            // <button class="fa fa-list menuButton"></button>
            // <button class="fa fa-plus menuButton"></button>
            // <button class="fa fa-question menuButton"></button>
            var container: HTMLDivElement = (document.getElementById("bottomMenu") as HTMLDivElement);

            var left: HTMLButtonElement = document.createElement("button");
            left.className = "fa fa-arrow-left menuButton";
            if (actionBttnLeft == undefined) {
                left.addEventListener("click", () => {
                    console.log("back home");
                    clearBody();
                    setBottomMenuBar(menu.home);
                    setup();
                });
            } else {
                left.addEventListener("click", actionBttnLeft);
            }

            var middle: HTMLButtonElement = document.createElement("button");
            middle.className = "fa fa-plus menuButton";
            if (actionBttnMiddle == undefined) {
                middle.addEventListener("click", () => {
                    console.log("add entry");
                });
            } else {
                middle.addEventListener('click', actionBttnMiddle);
            }

            var right: HTMLButtonElement = document.createElement("button");
            right.className = "menuButton";

            container.innerHTML = "";

            container.appendChild(left);
            container.appendChild(middle);
            container.appendChild(right);
            break;

        case menu.add:
            // <button class="fa fa-list menuButton"></button>
            // <button class="fa fa-plus menuButton"></button>
            // <button class="fa fa-question menuButton"></button>
            var container: HTMLDivElement = (document.getElementById("bottomMenu") as HTMLDivElement);

            var left: HTMLButtonElement = document.createElement("button");
            left.className = "fa fa-home menuButton";
            if (actionBttnLeft == undefined) {
                left.addEventListener("click", () => {
                    console.log("back home");
                    clearBody();
                    setBottomMenuBar(menu.home);
                    setup();
                });
            } else {
                left.addEventListener('click', actionBttnLeft);
            }

            var middle: HTMLButtonElement = document.createElement("button");
            middle.className = "fa fa-save menuButton";
            middle.style.color = "#0f0";

            if (actionBttnMiddle == undefined) {
                middle.addEventListener("click", () => {
                    console.log("save entry");
                });
            } else {
                middle.addEventListener('click', actionBttnMiddle);
            }

            var right: HTMLButtonElement = document.createElement("button");
            right.className = "fa fa-times menuButton";
            right.style.color = "red";

            if (actionBttnRight == undefined) {
                right.addEventListener("click", () => {
                    console.log("discard");
                });
            } else {
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