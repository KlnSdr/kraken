"use strict";
var newfield = /** @class */ (function () {
    function newfield(title) {
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
    newfield.prototype.create = function () {
        var container = document.createElement("div");
        container.classList.add("details");
        var headline = document.createElement("h2");
        headline.innerText = this.title;
        headline.classList.add("headline");
        var addData = document.createElement("div");
        addData.classList.add("addField");
        var dataIN = document.createElement("input");
        dataIN.type = "text";
        dataIN.classList.add("inputAddData");
        dataIN.id = "inputNewField";
        addData.appendChild(dataIN);
        container.appendChild(headline);
        container.appendChild(addData);
        this.self = container;
    };
    newfield.prototype.attach = function (parent) {
        clearBody();
        setBottomMenuBar(2 /* add */, undefined, function () {
            console.log("saving to localhost");
            var fieldName = document.getElementById("inputNewField").value;
            console.log(fieldName);
            var emptyData = {
                title: fieldName,
                max: "0",
                min: "0",
                average: "0",
                data: []
            };
            saveData(emptyData);
            clearBody();
            setBottomMenuBar(0 /* home */);
            setup();
        }, function () {
            console.log("back home");
            clearBody();
            setBottomMenuBar(0 /* home */);
            setup();
        });
        this.parent = parent;
        parent.appendChild(this.self);
    };
    return newfield;
}());
