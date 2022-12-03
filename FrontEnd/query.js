
const fetchTable = async (query) => {
    // const data = {
    //     query: "SELECT table_name FROM information_schema.tables WHERE table_schema='video_game_db' AND table_type='BASE TABLE';",
    // };
    await fetch(`http://localhost:3030/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((res) => res.json())
        .then((result2) => {
            console.log(result2);
            if (result2.err) {
                return;
            }
            const result = result2.data;
            let t = document.getElementById("table-data");
            t.remove();
            const body = document.getElementById("my-div");
            var table = document.createElement("table");
            table.setAttribute("id", "table-data");
            // head
            let thead = table.createTHead();
            let row = thead.insertRow();
            for (let i = 0; i < result.fields.length; ++i) {
                let key = result.fields[i].name;
                let th = document.createElement("th");
                let text = document.createTextNode(key);
                th.appendChild(text);
                row.appendChild(th);
            }
            // data insert
            for (let element of result.rows) {
                let row = table.insertRow();
                for (key in element) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                }
            }
            body.appendChild(table);
        })
        .catch((err) => {
            console.log(err);
        });
};
const showData = () => {
    let select_menu_value = document.getElementById("exampleInputEmail1").value;
    console.log(select_menu_value);
    fetchTable(select_menu_value);
};

let q = `set search_path to "video_game_db"`;
fetchTable(q);
q = `set datestyle = euro`;
fetchTable(q);