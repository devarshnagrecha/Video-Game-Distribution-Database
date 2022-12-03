const fetchData = () => {
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
        .then((result2) => {
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
        .catch((err) => {
            console.log(err);
        });
};
fetchData();

const deleteData = async (query) => {
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
        .then((result2) => {
            console.log(result2);
            if (result2.err) {
                const body = document.getElementById("my-div");
                body.appendChild(
                    document.createTextNode(JSON.stringify(result2.data))
                );
            } else {
                const body = document.getElementById("my-div");
                body.appendChild(
                    document.createTextNode("Data deleted succesfully")
                );
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const showFields =  () => {
    let select_menu_value = document.getElementById("table-select").value;
    
    console.log(select_menu_value);
    if(select_menu_value == "Game") {
        deleteFromGame();
    } else if(select_menu_value == "Player") {
        deleteFromPlayer();
    }
};

const deleteFromPlayer = () => 
{
    var div = document.getElementById('divv');

    var user_id = document.createElement("input");
    user_id.setAttribute("type", "text");
    user_id.setAttribute("name", "user_id");
    user_id.setAttribute("id", "user_id");
    user_id.setAttribute("placeholder", "Player_ID");
    div.appendChild(user_id)
    document.getElementById("user_id").style.padding ="5px 5px";
    document.getElementById("user_id").style.margin = "8px 0";
    document.getElementById("user_id").style.width = "40%";

    var btn = document.createElement('button');
    btn.setAttribute('id','delete_player');
    btn.setAttribute('onclick','deletePlayer()');
    var textBtn = document.createTextNode("Delete Player");
    btn.appendChild(textBtn);
    div.appendChild(btn);

}

const deletePlayer = () => {
    var user_id = document.getElementById("user_id").value;

    //console.log(user_id, user_password, fname, lname, DOB, email, wallet);
    const query = `DELETE FROM "video_game_db"."Player" WHERE "Player_ID" = '${user_id}';`;
    deleteData(query)
}

const deleteFromGame = () => {
    var div = document.getElementById('divv');

    var user_id = document.createElement("input");
    user_id.setAttribute("type", "text");
    user_id.setAttribute("name", "user_id");
    user_id.setAttribute("id", "user_id");
    user_id.setAttribute("placeholder", "Game_ID");
    div.appendChild(user_id)
    document.getElementById("user_id").style.padding ="5px 5px";
    document.getElementById("user_id").style.margin = "8px 0";
    document.getElementById("user_id").style.width = "40%";

    var btn = document.createElement('button');
    btn.setAttribute('id','delete_game');
    btn.setAttribute('onclick','deleteGame()');
    var textBtn = document.createTextNode("Delete game");
    btn.appendChild(textBtn);
    div.appendChild(btn);
}

const deleteGame = () => {
    var user_id = document.getElementById("user_id").value;

    const query = `DELETE FROM "video_game_db"."Game" WHERE "Game_ID" = '${user_id}';`;
    deleteData(query)
}
