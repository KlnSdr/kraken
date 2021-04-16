class datainput {
    private parent!: HTMLElement;
    private self!: HTMLDivElement;

    title: string;
    data: Array<number>;

    constructor(title: string, data: Array<number>) {
        this.title = title;
        this.data = data;

        console.log(data);
    }

    // <div class="details">
    //     <h3 class="headline">
    //         PeakFlow
    //     </h3>
    //     <div class="addData">
    //         <input type="text" class="inputAddData">
    //     </div>
    // </div>
    create() {
        const container: HTMLDivElement = document.createElement("div");
        container.classList.add("details");

        const headline: HTMLHeadingElement = document.createElement("h3");
        headline.innerText = this.title;
        headline.classList.add("headline");

        const addData: HTMLDivElement = document.createElement("div");
        addData.classList.add("addData");

        const dataIN: HTMLInputElement = document.createElement("input");
        dataIN.type = "number";
        dataIN.classList.add("inputAddData");
        dataIN.id = "inputAddData";

        addData.appendChild(dataIN);
        container.appendChild(headline);
        container.appendChild(addData);

        this.self = container;
    }

    attach(parent: HTMLElement) {
        clearBody();
        setBottomMenuBar(menu.add, undefined, () => {
            var max: number;
            var min: number;
            var average: number;

            console.log("saving to localhost");

            const dataToAdd: string = (<HTMLInputElement>document.getElementById("inputAddData")).value;

            if (this.data.length > 0) {
                this.data.push(parseFloat(dataToAdd));
                max = Math.max(...this.data);
                min = Math.min(...this.data);
                average = this.getAverage(this.data);
            } else {
                this.data = [parseFloat(dataToAdd)];
                max = this.data[0];
                min = this.data[0];
                average = this.data[0];
            }

            console.log({
                title: this.title,
                max: max,
                min: min,
                average: average,
                data: this.data
            });

            saveData({
                title: this.title,
                max: max,
                min: min,
                average: average,
                data: this.data
            });


            clearBody();
            const det: Detail = new Detail(this.title, this.data);
            det.create();
            det.attach(document.body);

        }, () => {
            clearBody();
            const det: Detail = new Detail(this.title, this.data);
            det.create();
            det.attach(document.body);
        });

        this.parent = parent;
        parent.appendChild(this.self);
    }

    private getAverage(array: Array<number>): number {
        var sum: number = 0;
        array.forEach((element: number) => {
            sum += element;
        });

        return Math.round(((sum / array.length) + Number.EPSILON) * 100) / 100;
    }
}