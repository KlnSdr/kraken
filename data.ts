function getData(): obj | null {
    const got: string | null = localStorage.getItem("kraken");

    if (got === null) {
        return null;
    } else {
        return JSON.parse(got);
    }
}

function saveData(field: obj) {
    var data: obj | null = getData();
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
    } else {
        var success: boolean = false;
        for (let i = 0; i < data.fields.length; i++) {
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