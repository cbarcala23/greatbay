var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "MyPassword",
    database: "item_informationDB"
});


//mysql -uroot -p < ./itemInform.sql

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
        type: "rawlist",
        message: "Choose an item",
        name: "choice",
    },
    {
        type: "input",
        message: "Bid Amount:",
        name: "bidAmount"
    },
];

// function updateItems() {
//     console.log("Updating available posts\n");
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//             {
//                 quantity: 100
//             },
//             {
//                 flavor: "Rocky Road"
//             }
//         ],
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " products updated!\n");
//         }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
// }


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
                    bidAmount: input.bidAmount
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " Items Inserted!\n");
                    // updateItems();
                })
                console.log(query.sql);
            greatBay();
        });
}

function promptBID() {
    connection.query("SELECT * FROM items", function(err, res) {
      if (err) throw err;
      console.log(res);
      //connection.end();
      inquirer
      .prompt(bidQ)
      .then(function (input) {
          //console.log(“Inserting a new product...\n”);
          var query = connection.query(
              "SELECT * FROM items WHERE ?",
              {
                  item: input.item,
              },
              function (err, res) {
                  if (err) throw err;
                  console.log(res.affectedRows + " product inserted!\n");
                  updateItems();
              })
          greatBay();
      });
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
                connection.end();
            }

        });
}

greatBay();