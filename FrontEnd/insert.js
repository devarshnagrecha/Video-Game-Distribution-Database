const fetchData = () =>
{
    const data = {
        query: "SELECT table_name FROM information_schema.tables WHERE table_schema='video_game_db' AND table_type='BASE TABLE';"
    };
    fetch(`http://localhost:3030/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((result2) =>
        {
            console.log(result2);
            if (result2.err) {
                const body = document.getElementById("my-div");
                body.appendChild(
                    document.createTextNode(JSON.stringify(result2.data))
                );
                return
            }
            const result = result2.data;
            for (let i = 0; i < result.rows.length; ++i) {
                let select_menu = document.getElementById("table-select");
                const newOption = document.createElement("option");
                const optionText = document.createTextNode(
                    result.rows[i].table_name
                );
                newOption.appendChild(optionText);
                newOption.setAttribute("value", result.rows[i].table_name);
                select_menu.appendChild(newOption);
            }
        })
        .catch((err) =>
        {
            console.log(err);
        });
};
fetchData();

const insertData = async (query) =>
{
    const data = {
        query: query,
    };
    fetch(`http://localhost:3030/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
    })
        .then((res) => res.json())
        .then((result2) =>
        {
            console.log(result2);
            if (result2.err) {
                const body = document.getElementById("my-div");
                body.appendChild(
                    document.createTextNode(JSON.stringify(result2.data))
                );
            } else {
                const body = document.getElementById("my-div");
                body.appendChild(
                    document.createTextNode("Data added succesfully")
                );
            }
        })
        .catch((err) =>
        {
            console.log(err);
        });
};

const showFields = () =>
{
    let select_menu_value = document.getElementById("table-select").value;

    console.log(select_menu_value);
    if (select_menu_value == "Game") {
        insertIntoGame();
    } else if (select_menu_value == "Player") {
        insertIntoPlayer();
    }
};

const insertIntoPlayer = () =>
{
    var div = document.getElementById('divv');

    var user_id = document.createElement("input");
    user_id.setAttribute("type", "text");
    user_id.setAttribute("name", "user_id");
    user_id.setAttribute("id", "user_id");
    user_id.setAttribute("placeholder", "Player_ID");
    div.appendChild(user_id);
    document.getElementById("user_id").style.padding ="5px 5px";
    document.getElementById("user_id").style.margin = "8px 0";
    document.getElementById("user_id").style.width = "40%";

    var user_password = document.createElement("input");
    user_password.setAttribute("type", "password");
    user_password.setAttribute("name", "user_password");
    user_password.setAttribute("id", "user_password");
    user_password.setAttribute("placeholder", "Password");
    div.appendChild(user_password);
    document.getElementById("user_password").style.padding ="5px 5px";
    document.getElementById("user_password").style.margin = "8px 0";
    document.getElementById("user_password").style.width = "40%";

    var fname = document.createElement("input");
    fname.setAttribute("type", "text");
    fname.setAttribute("name", "fname");
    fname.setAttribute("id", "fname");
    fname.setAttribute("placeholder", "F_Name");
    div.appendChild(fname);
    document.getElementById("fname").style.padding ="5px 5px";
    document.getElementById("fname").style.margin = "8px 0";
    document.getElementById("fname").style.width = "40%";

    var lname = document.createElement("input");
    lname.setAttribute("type", "text");
    lname.setAttribute("name", "lname");
    lname.setAttribute("id", "lname");
    lname.setAttribute("placeholder", "L_Name");
    div.appendChild(lname);
    document.getElementById("lname").style.padding ="5px 5px";
    document.getElementById("lname").style.margin = "8px 0";
    document.getElementById("lname").style.width = "40%";

    var DOB = document.createElement("input");
    DOB.setAttribute("type", "date");
    DOB.setAttribute("name", "DOB");
    DOB.setAttribute("id", "DOB");
    DOB.setAttribute("placeholder", "DOB");
    div.appendChild(DOB);
    document.getElementById("DOB").style.padding ="5px 5px";
    document.getElementById("DOB").style.margin = "8px 0";
    document.getElementById("DOB").style.width = "40%";

    var email = document.createElement("input");
    email.setAttribute("type", "text");
    email.setAttribute("name", "email");
    email.setAttribute("id", "email");
    email.setAttribute("placeholder", "Email_ID");
    div.appendChild(email);
    document.getElementById("email").style.padding ="5px 5px";
    document.getElementById("email").style.margin = "8px 0";
    document.getElementById("email").style.width = "40%";

    var wallet = document.createElement("input");
    wallet.setAttribute("type", "number");
    wallet.setAttribute("name", "wallet");
    wallet.setAttribute("id", "wallet");
    wallet.setAttribute("placeholder", "Wallet");
    div.appendChild(wallet);
    document.getElementById("wallet").style.padding ="5px 5px";
    document.getElementById("wallet").style.margin = "8px 0";
    document.getElementById("wallet").style.width = "40%";

    var btn = document.createElement('button');
    btn.setAttribute('id', 'insert_player');
    btn.setAttribute('onclick', 'insertPlayer()');

    var textBtn = document.createTextNode("Insert Player");
    btn.appendChild(textBtn);
    div.appendChild(btn);
}

const insertPlayer = () =>
{
    var user_id = document.getElementById("user_id").value;
    var user_password = document.getElementById("user_password").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var DOB = document.getElementById("DOB").value;
    var email = document.getElementById("email").value;
    var wallet = document.getElementById("wallet").value;

    console.log(user_id, user_password, fname, lname, DOB, email, wallet);
    const query = `insert into "video_game_db"."Player" values ('${user_id}','${user_password}','${fname}','${lname}','${DOB}','${email}', ${wallet});`;
    insertData(query)
}

const insertIntoGame = () =>
{
    var div = document.getElementById('divv');

    var gameid = document.createElement("input");
    gameid.setAttribute("type", "number");
    gameid.setAttribute("name", "gameid");
    gameid.setAttribute("id", "gameid");
    gameid.setAttribute("placeholder", "Game_ID");
    div.appendChild(gameid);
    document.getElementById("gameid").style.padding ="5px 5px";
    document.getElementById("gameid").style.margin = "8px 0";
    document.getElementById("gameid").style.width = "40%";

    var gamename = document.createElement("input");
    gamename.setAttribute("type", "text");
    gamename.setAttribute("name", "gamename");
    gamename.setAttribute("id", "gamename");
    gamename.setAttribute("placeholder", "Game_Name");
    div.appendChild(gamename);
    document.getElementById("gamename").style.padding ="5px 5px";
    document.getElementById("gamename").style.margin = "8px 0";
    document.getElementById("gamename").style.width = "40%";

    var about = document.createElement("input");
    about.setAttribute("type", "text");
    about.setAttribute("name", "about");
    about.setAttribute("id", "about");
    about.setAttribute("placeholder", "About");
    div.appendChild(about);
    document.getElementById("about").style.padding ="5px 5px";
    document.getElementById("about").style.margin = "8px 0";
    document.getElementById("about").style.width = "40%";

    var mrp = document.createElement("input");
    mrp.setAttribute("type", "number");
    mrp.setAttribute("name", "mrp");
    mrp.setAttribute("id", "mrp");
    mrp.setAttribute("placeholder", "MRP");
    div.appendChild(mrp);
    document.getElementById("mrp").style.padding ="5px 5px";
    document.getElementById("mrp").style.margin = "8px 0";
    document.getElementById("mrp").style.width = "40%";

    var demo = document.createElement("input");
    demo.setAttribute("type", "bool");
    demo.setAttribute("name", "demo");
    demo.setAttribute("id", "demo");
    demo.setAttribute("placeholder", "Demo (true/false)");
    div.appendChild(demo);
    document.getElementById("demo").style.padding ="5px 5px";
    document.getElementById("demo").style.margin = "8px 0";
    document.getElementById("demo").style.width = "40%";

    var releasedate = document.createElement("input");
    releasedate.setAttribute("type", "date");
    releasedate.setAttribute("name", "releasedate");
    releasedate.setAttribute("id", "releasedate");
    releasedate.setAttribute("placeholder", "Release_Date");
    div.appendChild(releasedate)
    document.getElementById("releasedate").style.padding ="5px 5px";
    document.getElementById("releasedate").style.margin = "8px 0";
    document.getElementById("releasedate").style.width = "40%";

    var lastupdate = document.createElement("input");
    lastupdate.setAttribute("type", "date");
    lastupdate.setAttribute("name", "lastupdate");
    lastupdate.setAttribute("id", "lastupdate");
    lastupdate.setAttribute("placeholder", "Last_Update");
    div.appendChild(lastupdate)
    document.getElementById("lastupdate").style.padding ="5px 5px";
    document.getElementById("lastupdate").style.margin = "8px 0";
    document.getElementById("lastupdate").style.width = "40%";

    var devid = document.createElement("input");
    devid.setAttribute("type", "number");
    devid.setAttribute("name", "devid");
    devid.setAttribute("id", "devid");
    devid.setAttribute("placeholder", "Dev_ID");
    div.appendChild(devid);
    document.getElementById("devid").style.padding ="5px 5px";
    document.getElementById("devid").style.margin = "8px 0";
    document.getElementById("devid").style.width = "40%";

    var btn = document.createElement('button');
    btn.setAttribute('id', 'insert_game');
    btn.setAttribute('onclick', 'insertGame()');

    var textBtn = document.createTextNode("Insert Game");
    btn.appendChild(textBtn);
    div.appendChild(btn);
}

const insertGame = () =>
{
    var gameid = document.getElementById("gameid").value;
    var gamename = document.getElementById("gamename").value;
    var about = document.getElementById("about").value;
    var mrp = document.getElementById("mrp").value;
    var demo = document.getElementById("demo").value;
    var releasedate = document.getElementById("releasedate").value;
    var lastupdate = document.getElementById("lastupdate").value;
    var devid = document.getElementById("devid").value;

    const query = `insert into "video_game_db"."Game" values(${gameid},'${gamename}', '${about}', ${mrp}, ${demo}, '${releasedate}', '${lastupdate}', ${devid});`;
    console.log(query);
    insertData(query)
}