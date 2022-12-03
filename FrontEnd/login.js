var user_name, user_password, query;
let money;
const login = async () => {
    user_name = document.getElementById("form3Example3").value;
    user_password = document.getElementById("form3Example4").value;
    query = `SELECT * FROM "video_game_db"."Player" WHERE "Player_ID"='${user_name}' AND "Password"='${user_password}'`;
    console.log(query);
    await insertData(query)
}

const fetchTable3 = async (query) => {
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
                const body = document.getElementById("my-div");
                body.appendChild(
                    document.createTextNode(JSON.stringify(result2.data))
                );
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
let q1 = `SET SEARCH_PATH to "video_game_db"`;
fetchTable3(q1);

// console.log(user_name);
// console.log(user_password);

const insertData = async (query) => {
    // console.log(query);
    await fetch(`http://localhost:3030/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((res) => res.json())
        .then((result2) => {
            if (result2.err) {
                const body = document.body;
                body.appendChild(
                    document.createTextNode("Wrong Credentials")
                );
            } else {
                // Check if >= 2 or Zero entries are there then print error
                const body = document.body;

                if (result2.data.rowCount == 1) {
                    // console.log("Logged In successfully");
                    green();

                    let q = `SELECT "F_Name", "L_Name", "DOB", "Email_ID", "Wallet" FROM "video_game_db"."Player" WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q, "mydiv7", "tabledata7");

                    let q4 = `SELECT "Card_Number", "Card_Type", "Expiry_Date" FROM "video_game_db"."Payment_Card" WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q4, "mydiv8", "tabledata8");

                    let q1 = `SELECT "Purchase_ID", "Purchase_Type", "Game_ID", "Game_Name", "Date_Purchased", "Card_Number"
                    FROM "video_game_db"."Purchase" NATURAL JOIN "video_game_db"."Game"
                    WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q1, "mydiv4", "tabledata4");

                    let q2 = `SELECT "Achv_ID", "Date_Achieved" FROM "video_game_db"."Achieves" WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q2, "mydiv5", "tabledata5");

                    let q3 = `SELECT "Season_No", "Reward_Amount", "Game_ID", "Game_Name", "Date_Rewarded"  FROM "video_game_db"."Season_Rewards" NATURAL JOIN "video_game_db"."Game" WHERE "Player_ID" = '${user_name}';`;
                    fetchTable(q3, "mydiv6", "tabledata6");
                }

                else {
                    red();
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const fetchTable = async (query, table_div, table_data) => {
    const data = {
        query: "SELECT table_name FROM information_schema.tables WHERE table_schema='video_game_db' AND table_type='BASE TABLE';",
    };
    await fetch(`http://localhost:3030/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((res) => res.json())
        .then((result2) => {
            //console.log(result2);
            if (result2.err) {
                const body = document.getElementById(`${table_div}`);
                // body.appendChild(
                //     document.createTextNode(JSON.stringify(result2.data))
                // );
                return;
            }
            const result = result2.data;
            let t = document.getElementById(`${table_data}`);
            t.remove();
            const body = document.getElementById(`${table_div}`);
            var table = document.createElement("table");
            table.setAttribute("id", `${table_data}`);
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

// let q = `SELECT * FROM "video_game_db"."Player" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q, "mydiv7", "tabledata7");

// let q1 = `SELECT * FROM "video_game_db"."Purchase" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q1, "mydiv4", "tabledata4");

// let q2 = `SELECT * FROM "video_game_db"."Achieves" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q2, "mydiv5", "tabledata5");

// let q3 = `SELECT * FROM "video_game_db"."Season_Rewards" WHERE "Player_ID" = ${user_name};`;
// fetchTable(q3, "mydiv6", "tabledata6");
const fetchTable2 = async (query, table_div, table_data) => {
    const data = {
        query: "SELECT table_name FROM information_schema.tables WHERE table_schema='video_game_db' AND table_type='BASE TABLE';",
    };
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
                const body = document.getElementById(`${table_div}`);
                // body.appendChild(
                //     document.createTextNode(JSON.stringify(result2.data))
                // );
                return;
            }
            const result = result2.data;
            let t = document.getElementById(`${table_data}`);
            t.remove();
            const body = document.getElementById(`${table_div}`);
            var table = document.createElement("table");
            table.setAttribute("id", `${table_data}`);
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
            let th = document.createElement("th");
            row.appendChild(th);

            // data insert
            for (let element of result.rows) {
                let row = table.insertRow();
                for (key in element) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    if (key == "Demo_Version") {
                        //console.log("Hey");
                        if (text.length == 4) {
                            // console.log("Hey");
                            var btn = document.createElement('button');
                            btn.classList.add("btn");
                            btn.classList.add("btn-primary");
                            btn.classList.add("btn-small");
                            btn.style.margin = "2px";
                            var textBtn = document.createTextNode("Download");
                            btn.appendChild(textBtn);
                            cell.appendChild(btn);
                        }
                    }
                    else {
                        cell.appendChild(text);
                    }
                    // if (key == "MRP") {
                    //     //console.log("Hey");
                    //     if (text <= money) {
                    //         console.log(text);
                    //         console.log(money);
                    //         var btn = document.createElement('button');
                    //         btn.classList.add("btn");
                    //         btn.classList.add("btn-primary");
                    //         btn.classList.add("btn-small");
                    //         btn.style.margin = "2px";
                    //         var textBtn = document.createTextNode("Purchase");
                    //         btn.appendChild(textBtn);
                    //         cell.appendChild(btn);
                    //     }
                    // }
                    // else {
                    //     cell.appendChild(text);
                    // }
                }
                let cell = row.insertCell();
                var btn = document.createElement('button');
                btn.classList.add("btn");
                btn.classList.add("btn-primary");
                btn.classList.add("btn-small");
                btn.style.margin = "2px";
                var textBtn = document.createTextNode("Purchase");
                btn.appendChild(textBtn);
                cell.appendChild(btn);
            }
            body.appendChild(table);
        })
        .catch((err) => {
            console.log(err);
        });
};

function green() {
    var x = document.getElementById("myDIV");
    x.innerHTML = "User Logged in Successfully!";
    x.style.color = "green";

    var y = document.getElementById("myDIV2");
    y.innerHTML = `Welcome back, ${user_name}!`;
    y.style.color = "orange";

    var z = document.getElementById("myDIV3");
    z.innerHTML="";
    var btn = document.createElement('button');
    btn.setAttribute('onclick', 'logout()');
    btn.style.margin = "5px";
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    btn.classList.add("btn-small");
    var textBtn = document.createTextNode("Logout");
    btn.appendChild(textBtn);
    z.appendChild(btn);

    var btn2 = document.createElement('button');
    btn2.setAttribute('onclick', 'shop()');
    btn2.classList.add("btn");
    btn2.classList.add("btn-primary");
    btn2.classList.add("btn-small");
    btn.style.margin = "5px";
    var textBtn2 = document.createTextNode("Visit Store");
    btn2.appendChild(textBtn2);
    z.appendChild(btn2);
}

function red() {
    var x = document.getElementById("myDIV");
    x.innerHTML = "Invalid Credentials!";
    x.style.color = "red";
}

const logout = () => {
    location.href = "./index.html";
}

const shop = () => {
    console.log();
    document.getElementById("mydiv10").innerHTML = "Game Store";
    let q = `SELECT "Game_Name", "MRP", "Demo_Version", "video_game_db".FinalPrice("Game_ID") FROM "video_game_db"."Game";`;
    fetchTable2(q, "mydiv9", "tabledata9");
}
