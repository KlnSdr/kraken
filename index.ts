type obj = {
    [key: string]: any
}

function setup() {
    clearBody();
    setBottomMenuBar(menu.home);


    // <div class="allFields">
    //     <h2 class="headline">meine Datenfelder:</h2>
    //     <ul id="testContainer">

    //     </ul>
    // </div>

    const divAllFields: HTMLDivElement = document.createElement("div");
    divAllFields.classList.add("allFields");

    const headline: HTMLHeadingElement = document.createElement("h2");
    headline.classList.add("headline");
    headline.innerText = "meine Datenfelder";

    const listContainer: HTMLUListElement = document.createElement("ul");
    listContainer.id = "testContainer";

    divAllFields.appendChild(headline);
    divAllFields.appendChild(listContainer);

    document.body.appendChild(divAllFields);

    const fields: obj | null = getData();

    if (fields === null) {
        return;
    }

    for (const field of fields.fields) {
        const li: HTMLLIElement = document.createElement("li");
        (document.getElementById("testContainer") as HTMLElement).appendChild(li);

        const card: Card = new Card(field.title, field.data);
        card.create();
        card.attach(li);
    }
}