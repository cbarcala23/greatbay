var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "@Lph@20!!",
    database: "playlist_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM songs", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}

//mysql -uroot -p < ./playlist.sql

const postQ = [
    {
        type: "input",
        message: "Item name:",
        name: "item"
    },
    {
        type: "input",
        message: "Category:",
        name: "category"
    },
    {
        type: "input",
        message: "Bid Amount:",
        name: "amount"
    },
];

const bidQ = [
    {
        type: "input",
        message: "Choose an item",
        name: "choice",
    },
    {
        type: "input",
        message: "Bid Amount:",
        name: "amount"
    },
];

function updateItems() {

}

function promptPOST() {
    inquirer
        .prompt(postQ)
        .then(function (input) {
            console.log("Inserting a new product...\n");
            var query = connection.query(
                "INSERT INTO items SET ?",
                {
                    item: input.item,
                    category: input.category,
                    amount: input.amount
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " product inserted!\n");
                    updateItems();
                })
            greatBay();
        });
}


function greatBay() {

    const prompt = [
        {
            type: "list",
            message: "What would you like to do?",
            name: "action",
            choices: [
                "POST",
                "BID",
                "END"
            ]
        }];

    inquirer
        .prompt(prompt)
        .then(function (input) {
            console.log(input);

            if (input.action === "POST") {
                promptPOST();
            }
            if (input.action === "BID") {
                promptBID();
            }
            else if (input.action === "END") {


                return;
            }

        });
}

greatBay();