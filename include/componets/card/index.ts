class Card {
    parent!: HTMLElement;
    self!: HTMLDivElement;

    title!: string
    max!: number;
    min!: number;
    average!: number;
    data!: Array<number>;

    bttnClicked!: boolean;

    constructor(title: string, data: Array<number>) {
        this.title = title;
        this.data = data;
        this.max = Math.max(...data);
        this.min = Math.min(...data);
        this.average = this.getAverage(this.data);

        this.bttnClicked = false;
    }
    /*
    <div class="dataField">
        <h3>PeakFlow</h3>
        <p>letzter Eintrag: 04.04.2021</p>
        <table>
            <tr>
                <td>
                    min: 650
                </td>
                </td>
                <td>
                    Durchschnitt: 725
                </td>
            </tr>
            <tr>
                <td>
                    max: 800
                </td>
                </td>
                <td>
                    <button class="fa fa-plus"></button>
                </td>
            </tr>
        </table>
    </div>
    */
    create() {
        var that: this = this;

        const div: HTMLDivElement = document.createElement("div");
        div.classList.add("dataField");

        div.addEventListener("click", () => {
            if (that.bttnClicked == false) {
                const det: Detail = new Detail(this.title, this.data);
                det.create();
                det.attach(document.body);
            } else {
                that.bttnClicked = false;
            }
        });

        const headline: HTMLHeadingElement = document.createElement("h3");
        headline.innerText = this.title;

        const table: HTMLTableElement = document.createElement("table");

        const lineOne: HTMLTableRowElement = document.createElement("tr");
        const tdMin: HTMLTableDataCellElement = document.createElement("td");
        tdMin.innerText = "min: " + this.min.toString();
        const tdDurchschnitt: HTMLTableDataCellElement = document.createElement("td");
        tdDurchschnitt.innerText = "Durchschnitt: " + this.average.toString();
        lineOne.appendChild(tdMin);
        lineOne.appendChild(tdDurchschnitt);

        const lineTwo: HTMLTableRowElement = document.createElement("tr");
        const tdMax: HTMLTableDataCellElement = document.createElement("td");
        tdMax.innerText = "max: " + this.max.toString();
        const bttnAddEntry: HTMLButtonElement = document.createElement("button");
        bttnAddEntry.classList.add("fa");
        bttnAddEntry.classList.add("fa-plus");

        bttnAddEntry.addEventListener("click", () => {
            that.bttnClicked = true;
            console.log("add entry");

            const addData: datainput = new datainput(this.title, this.data);
            addData.create();
            addData.attach(document.body);
        });

        lineTwo.appendChild(tdMax);
        lineTwo.appendChild(bttnAddEntry);

        table.appendChild(lineOne);
        table.appendChild(lineTwo);

        div.appendChild(headline);
        div.appendChild(table);

        this.self = div;
    }

    attach(parent: HTMLElement) {
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