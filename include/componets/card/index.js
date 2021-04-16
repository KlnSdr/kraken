"use strict";
var Card = /** @class */ (function () {
    function Card(title, data) {
        this.title = title;
        this.data = data;
        this.max = Math.max.apply(Math, data);
        this.min = Math.min.apply(Math, data);
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
    Card.prototype.create = function () {
        var _this = this;
        var that = this;
        var div = document.createElement("div");
        div.classList.add("dataField");
        div.addEventListener("click", function () {
            if (that.bttnClicked == false) {
                var det = new Detail(_this.title, _this.data);
                det.create();
                det.attach(document.body);
            }
            else {
                that.bttnClicked = false;
            }
        });
        var headline = document.createElement("h3");
        headline.innerText = this.title;
        var table = document.createElement("table");
        var lineOne = document.createElement("tr");
        var tdMin = document.createElement("td");
        tdMin.innerText = "min: " + this.min.toString();
        var tdDurchschnitt = document.createElement("td");
        tdDurchschnitt.innerText = "Durchschnitt: " + this.average.toString();
        lineOne.appendChild(tdMin);
        lineOne.appendChild(tdDurchschnitt);
        var lineTwo = document.createElement("tr");
        var tdMax = document.createElement("td");
        tdMax.innerText = "max: " + this.max.toString();
        var bttnAddEntry = document.createElement("button");
        bttnAddEntry.classList.add("fa");
        bttnAddEntry.classList.add("fa-plus");
        bttnAddEntry.addEventListener("click", function () {
            that.bttnClicked = true;
            console.log("add entry");
            var addData = new datainput(_this.title, _this.data);
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
    };
    Card.prototype.attach = function (parent) {
        this.parent = parent;
        parent.appendChild(this.self);
    };
    Card.prototype.getAverage = function (array) {
        var sum = 0;
        array.forEach(function (element) {
            sum += element;
        });
        return Math.round(((sum / array.length) + Number.EPSILON) * 100) / 100;
    };
    return Card;
}());
