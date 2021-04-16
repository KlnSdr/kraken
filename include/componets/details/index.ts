class Detail {
    self!: HTMLDivElement;
    parent!: HTMLElement;
    data: Array<number>;
    headline: string;

    lineChartConfig!: obj;
    canvasLineChart!: HTMLCanvasElement;
    barChartConfig!: obj;
    canvasBarChart!: HTMLCanvasElement;

    constructor(headline: string, data: Array<number>) {
        this.headline = headline;
        this.data = data;
    }

    create() {
        /*
        <div class="details">
            <h3 class="headline">
                PeakFlow
            </h3>
            <canvas class="outputChart">
                <!-- hier hin kommt das Diagramm Daten gegen Zeit/Eintragsdatum -->
            </canvas>
            <table>
                <tr>
                    <td>
                        min:
                    </td>
                    <td>
                        625
                    </td>
                </tr>
                <tr>
                    <td>
                        max:
                    </td>
                    <td>
                        800
                    </td>
                </tr>
                <tr>
                    <td>
                        &#8709;
                    </td>
                    <td>
                        725
                    </td>
                </tr>
            </table>
            <canvas class="outputChart">

            </canvas>
        </div>
        */
        const container: HTMLDivElement = document.createElement("div");
        container.classList.add("details");

        const headline: HTMLHeadingElement = document.createElement("h3");
        headline.classList.add("headline");
        headline.innerText = this.headline;

        const canvasLineChart: HTMLCanvasElement = document.createElement("canvas");
        canvasLineChart.classList.add("outputChart");
        this.createLineChart(canvasLineChart);

        const canvasBarChart: HTMLCanvasElement = document.createElement("canvas");
        canvasBarChart.classList.add("outputChart");
        this.createBarChart(canvasBarChart);

        const table: HTMLTableElement = document.createElement("table");

        const listMinMaxMed: Array<string> = ["min:", "max:", "\u2205:"];
        const values: Array<number> = [Math.min(...this.data), Math.max(...this.data), this.average(this.data)];

        for (let i = 0; i < listMinMaxMed.length; i++) {
            const tr: HTMLTableRowElement = document.createElement("tr");

            const td1: HTMLTableDataCellElement = document.createElement("td");
            td1.innerText = listMinMaxMed[i];

            const td2: HTMLTableDataCellElement = document.createElement("td");
            td2.innerText = values[i].toString();

            tr.appendChild(td1);
            tr.appendChild(td2);

            table.appendChild(tr);
        }

        container.appendChild(headline);
        container.appendChild(canvasLineChart);
        container.appendChild(table);
        container.appendChild(canvasBarChart);

        this.self = container;
    }

    private average(array: Array<number>): number {
        var sum: number = 0;
        array.forEach((element: number) => {
            sum += element;
        });

        return Math.round(((sum / array.length) + Number.EPSILON) * 100) / 100;
    }

    attach(parent: HTMLElement) {
        clearBody();
        setBottomMenuBar(menu.details, undefined, () => {
            const addData: datainput = new datainput(this.headline, this.data);
            addData.create();
            addData.attach(document.body);
        });

        this.parent = parent;
        this.parent.appendChild(this.self);

        var charterJetLineChart: Chart;
        charterJetLineChart = new Chart(this.canvasLineChart.getContext('2d')!, this.lineChartConfig);
        var charterJetBarChart: Chart;
        charterJetBarChart = new Chart(this.canvasBarChart.getContext('2d')!, this.barChartConfig);
    }

    private createLineChart(target: HTMLCanvasElement) {
        this.canvasLineChart = target;
        const displayDataLine: Array<number> = this.data;
        const minimum: number = this.pumpUpThisRookieNumber(Math.min(...displayDataLine));
        const maximum: number = Math.max(...displayDataLine);

        this.lineChartConfig = {
            type: 'line',
            data: {
                labels: ",".repeat(displayDataLine.length).split(","),
                datasets: [{
                    data: displayDataLine,
                    borderWidth: 2,
                    label: "",
                    backgroundColor: "#f000",
                    borderColor: "#88c0d0",
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#88c0d0",
                            // maxTicksLimit: maximum/10,
                            min: minimum,
                            max: Math.ceil(maximum)
                        },
                        gridLines: {
                            color: "#88c0d055"
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: displayDataLine.length
                        },
                        gridLines: {
                            display: false,
                            color: "#88c0d055"
                        }

                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                title: {
                    display: false,
                    text: "Überschrift",
                    fontColor: "#88c0d0"
                },
                animation: {
                    duration: 1000
                },
                elements: {
                    point: {
                        radius: 1
                    }
                }
            }
        }

        //=============================================================
        // refreshData();
    }

    private createBarChart(target: HTMLCanvasElement) {
        this.canvasBarChart = target;
        const counts: obj = this.getCounts(this.data);

        const sortedBarData: Array<string> = Object.keys(counts).sort((n1, n2) => {
            return ((parseInt(n1) < parseInt(n2)) ? -1 : 1);
        });

        var displayDataBar: Array<number> = [];
        for (let i = 0; i < sortedBarData.length; i++) {
            displayDataBar.push(counts[sortedBarData[i]]);
        }

        console.log(sortedBarData);
        console.log(displayDataBar);

        const maximum: number = Math.max(...displayDataBar);

        //=============================================================
        // refreshData();
        this.barChartConfig = {
            type: 'bar',
            data: {
                labels: sortedBarData,
                datasets: [{
                    data: displayDataBar,
                    borderWidth: 2,
                    label: "",
                    backgroundColor: "#88c0d0",
                    borderColor: "#88c0d0",
                    barThickness: 5
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#88c0d0",
                            min: 0,
                            max: maximum
                        },
                        gridLines: {
                            color: "#88c0d055"
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#88c0d0",
                            maxTicksLimit: 10,
                        },
                        gridLines: {
                            display: false,
                            color: "#88c0d055"
                        }

                    }]
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                },
                title: {
                    display: false,
                    text: "Überschrift",
                    fontColor: "#88c0d0"
                },
                animation: {
                    duration: 1000
                },
                elements: {
                    point: {
                        radius: 2
                    }
                }
            }
        };
    }

    private getCounts(data: Array<number>): obj {
        const result: obj = {};
        data.forEach((element: number) => {
            if (Object.keys(result).indexOf(element.toString()) > -1) {
                result[element.toString()] += 1;
            } else {
                result[element.toString()] = 1;
            }
        });
        return result;
    }

    private pumpUpThisRookieNumber(minimum: number) {
        if (minimum < 0) {
            return minimum - (1 - (Math.abs(minimum) + Math.ceil(minimum)));
        } else if (minimum > 0) {
            return minimum - (1 - Math.abs((minimum - Math.ceil(minimum))));
        } else {
            return 0;
        }
    }
}