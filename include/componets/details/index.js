"use strict";
var Detail = /** @class */ (function () {
    function Detail(headline, data) {
        this.headline = headline;
        this.data = data;
    }
    Detail.prototype.create = function () {
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
        var container = document.createElement("div");
        container.classList.add("details");
        var headline = document.createElement("h3");
        headline.classList.add("headline");
        headline.innerText = this.headline;
        var canvasLineChart = document.createElement("canvas");
        canvasLineChart.classList.add("outputChart");
        this.createLineChart(canvasLineChart);
        var canvasBarChart = document.createElement("canvas");
        canvasBarChart.classList.add("outputChart");
        this.createBarChart(canvasBarChart);
        var table = document.createElement("table");
        var listMinMaxMed = ["min:", "max:", "\u2205:"];
        var values = [Math.min.apply(Math, this.data), Math.max.apply(Math, this.data), this.average(this.data)];
        for (var i = 0; i < listMinMaxMed.length; i++) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerText = listMinMaxMed[i];
            var td2 = document.createElement("td");
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
    };
    Detail.prototype.average = function (array) {
        var sum = 0;
        array.forEach(function (element) {
            sum += element;
        });
        return Math.round(((sum / array.length) + Number.EPSILON) * 100) / 100;
    };
    Detail.prototype.attach = function (parent) {
        var _this = this;
        clearBody();
        setBottomMenuBar(1 /* details */, undefined, function () {
            var addData = new datainput(_this.headline, _this.data);
            addData.create();
            addData.attach(document.body);
        });
        this.parent = parent;
        this.parent.appendChild(this.self);
        var charterJetLineChart;
        charterJetLineChart = new Chart(this.canvasLineChart.getContext('2d'), this.lineChartConfig);
        var charterJetBarChart;
        charterJetBarChart = new Chart(this.canvasBarChart.getContext('2d'), this.barChartConfig);
    };
    Detail.prototype.createLineChart = function (target) {
        this.canvasLineChart = target;
        var displayDataLine = this.data;
        var minimum = this.pumpUpThisRookieNumber(Math.min.apply(Math, displayDataLine));
        var maximum = Math.max.apply(Math, displayDataLine);
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
        };
        //=============================================================
        // refreshData();
    };
    Detail.prototype.createBarChart = function (target) {
        this.canvasBarChart = target;
        var counts = this.getCounts(this.data);
        var sortedBarData = Object.keys(counts).sort(function (n1, n2) {
            return ((parseInt(n1) < parseInt(n2)) ? -1 : 1);
        });
        var displayDataBar = [];
        for (var i = 0; i < sortedBarData.length; i++) {
            displayDataBar.push(counts[sortedBarData[i]]);
        }
        console.log(sortedBarData);
        console.log(displayDataBar);
        var maximum = Math.max.apply(Math, displayDataBar);
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
    };
    Detail.prototype.getCounts = function (data) {
        var result = {};
        data.forEach(function (element) {
            if (Object.keys(result).indexOf(element.toString()) > -1) {
                result[element.toString()] += 1;
            }
            else {
                result[element.toString()] = 1;
            }
        });
        return result;
    };
    Detail.prototype.pumpUpThisRookieNumber = function (minimum) {
        if (minimum < 0) {
            return minimum - (1 - (Math.abs(minimum) + Math.ceil(minimum)));
        }
        else if (minimum > 0) {
            return minimum - (1 - Math.abs((minimum - Math.ceil(minimum))));
        }
        else {
            return 0;
        }
    };
    return Detail;
}());
