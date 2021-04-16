"use strict";
function getData() {
    var got = localStorage.getItem("kraken");
    if (got === null) {
        return null;
    }
    else {
        return JSON.parse(got);
    }
}
function saveData(field) {
    var data = getData();
    // nach field.title suchen
    // max, min, average & data updaten
    // speichern
    if (data === null) {
        data = {
            "fields": [
                field
            ]
        };
        console.log(data);
    }
    else {
        var success = false;
        for (var i = 0; i < data.fields.length; i++) {
            console.log(data.fields[i].title);
            if (data.fields[i].title == field.title) {
                data.fields[i] = field;
                success = true;
                console.log("found one");
            }
        }
        if (!success) {
            data.fields.push(field);
        }
    }
    console.log(data);
    localStorage.setItem("kraken", JSON.stringify(data));
}
