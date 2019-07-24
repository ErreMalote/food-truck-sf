module.exports = [{
        type: "list",
        name: "pagination",
        message: "Do you want to see more or go to see more or go to the previous page?",
        choices: [{
                key: "n",
                name: "Next",
                value: +10
            },
            {
                key: "p",
                name: "Previous",
                value: -10
            },
            {
                key: "exit",
                name: "Exit",
                value: "exit"
            }
        ]
    },
    {
        type: "list",
        name: "paginationFirst",
        message: "Do you want to see more?",
        choices: [{
                key: "n",
                name: "Next",
                value: +10
            },
            {
                key: "exit",
                name: "Exit",
                value: "exit"
            }
        ]
    },
    {
        type: "list",
        name: "paginationLast",
        message: "No Results. Do you want to see the previous?",
        choices: [{
                key: "p",
                name: "Previous",
                value: -10
            },
            {
                key: "exit",
                name: "Exit",
                value: "exit"
            }
        ]
    }
]