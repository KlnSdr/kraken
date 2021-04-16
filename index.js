"use strict";
function setup() {
    clearBody();
    setBottomMenuBar(0 /* home */);
    // <div class="allFields">
    //     <h2 class="headline">meine Datenfelder:</h2>
    //     <ul id="testContainer">
    //     </ul>
    // </div>
    var divAllFields = document.createElement("div");
    divAllFields.classList.add("allFields");
    var headline = document.createElement("h2");
    headline.classList.add("headline");
    headline.innerText = "meine Datenfelder";
    var listContainer = document.createElement("ul");
    listContainer.id = "testContainer";
    divAllFields.appendChild(headline);
    divAllFields.appendChild(listContainer);
    document.body.appendChild(divAllFields);
    var fields = getData();
    if (fields === null) {
        return;
    }
    for (var _i = 0, _a = fields.fields; _i < _a.length; _i++) {
        var field = _a[_i];
        var li = document.createElement("li");
        document.getElementById("testContainer").appendChild(li);
        var card = new Card(field.title, field.data);
        card.create();
        card.attach(li);
    }
}
