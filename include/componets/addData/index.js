"use strict";
var datainput = /** @class */ (function () {
    function datainput(title, data) {
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
    datainput.prototype.create = function () {
        var container = document.createElement("div");
        container.classList.add("details");
        var headline = document.createElement("h3");
        headline.innerText = this.title;
        headline.classList.add("headline");
        var addData = document.createElement("div");
        addData.classList.add("addData");
        var dataIN = document.createElement("input");
        dataIN.type = "number";
        dataIN.classList.add("inputAddData");
        dataIN.id = "inputAddData";
        addData.appendChild(dataIN);
        container.appendChild(headline);
        container.appendChild(addData);
        this.self = container;
    };
    datainput.prototype.attach = function (parent) {
        var _this = this;
        clearBody();
        setBottomMenuBar(2 /* add */, undefined, function () {
            var max;
            var min;
            var average;
            console.log("saving to localhost");
            var dataToAdd = document.getElementById("inputAddData").value;
            if (_this.data.length > 0) {
                _this.data.push(parseFloat(dataToAdd));
                max = Math.max.apply(Math, _this.data);
                min = Math.min.apply(Math, _this.data);
                average = _this.getAverage(_this.data);
            }
            else {
                _this.data = [parseFloat(dataToAdd)];
                max = _this.data[0];
                min = _this.data[0];
                average = _this.data[0];
            }
            console.log({
                title: _this.title,
                max: max,
                min: min,
                average: average,
                data: _this.data
            });
            saveData({
                title: _this.title,
                max: max,
                min: min,
                average: average,
                data: _this.data
            });
            clearBody();
            var det = new Detail(_this.title, _this.data);
            det.create();
            det.attach(document.body);
        }, function () {
            clearBody();
            var det = new Detail(_this.title, _this.data);
            det.create();
            det.attach(document.body);
        });
        this.parent = parent;
        parent.appendChild(this.self);
    };
    datainput.prototype.getAverage = function (array) {
        var sum = 0;
        array.forEach(function (element) {
            sum += element;
        });
        return Math.round(((sum / array.length) + Number.EPSILON) * 100) / 100;
    };
    return datainput;
}());
