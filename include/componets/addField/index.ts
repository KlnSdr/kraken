class newfield {
    private parent!: HTMLElement;
    private self!: HTMLDivElement;

    title: string;

    constructor(title: string) {
        this.title = title;
    }

    // <div class="details">
    //     <h2 class="headline">
    //         PeakFlow
    //     </h2>
    //     <div class="addData">
    //         <input type="text" class="inputAddData">
    //     </div>
    // </div>
    create() {
        const container: HTMLDivElement = document.createElement("div");
        container.classList.add("details");

        const headline: HTMLHeadingElement = document.createElement("h2");
        headline.innerText = this.title;
        headline.classList.add("headline");

        const addData: HTMLDivElement = document.createElement("div");
        addData.classList.add("addField");

        const dataIN: HTMLInputElement = document.createElement("input");
        dataIN.type = "text";
        dataIN.classList.add("inputAddData");
        dataIN.id = "inputNewField";

        addData.appendChild(dataIN);
        container.appendChild(headline);
        container.appendChild(addData);

        this.self = container;
    }

    attach(parent: HTMLElement) {
        clearBody();
        setBottomMenuBar(menu.add, undefined, () => {
            console.log("saving to localhost");
            const fieldName: string = (<HTMLInputElement>document.getElementById("inputNewField")).value;
            console.log(fieldName);

            const emptyData: obj = {
                title: fieldName,
                max: "0",
                min: "0",
                average: "0",
                data: [
                ]
            };

            saveData(emptyData);

            clearBody();
            setBottomMenuBar(menu.home);
            setup();
        }, () => {
            console.log("back home");
            clearBody();
            setBottomMenuBar(menu.home);
            setup();
        });

        this.parent = parent;
        parent.appendChild(this.self);
    }
}