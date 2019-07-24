#!/usr/bin/env node

const clear = require('clear');
const util = require('util');
const inquirer = require('inquirer')
const request = require('request');
const promiseRequest = util.promisify(request);
const questions = require('./questions.js');

clear();

/**
 * this function looks for all the trucks open at the time of the query being ran
 * @param {number} offset the pagination value on which the query is going to look for.
 */
const getListOfOpenTrucks = async(offset) => {
    let today = new Date();
    let dayOrder = today.getDay();
    let hour = `${today.getHours()}:00`;
    let resultList = null
    await promiseRequest(`https://data.sfgov.org/resource/jjew-r69b.json?$where=dayOrder=${dayOrder} AND start24<='${hour}' AND end24>'${hour}'&$limit=10&$offset=${offset}`).
    then((response) => {
        let listOfTrucks = JSON.parse(response.body);

        // ordering alphabetically
        listOfTrucks.sort((a, b) => (a.applicant > b.applicant) ? 1 : -1);

        if (listOfTrucks !== []) {
            resultList = ''
            listOfTrucks.map(foodTruck => {
                resultList += `- Name: ${foodTruck.applicant}, Address: ${foodTruck.location}\n`
            })
        }
    })
    return resultList;
}

const run = async() => {
    let offset = 0;
    // otherwise the program skips the first line of results
    console.log('\n')
    while (true) {
        let listOfOpenTrucks = await getListOfOpenTrucks(offset);
        if (listOfOpenTrucks && listOfOpenTrucks !== -1) {
            console.log(listOfOpenTrucks);
            if (offset === 0) {
                await inquirer.prompt(questions[1])
                    .then(answers => {
                        if (answers.paginationFirst === 'exit') {
                            process.exit()
                        }
                        offset += answers.paginationFirst
                    });

            } else {
                await inquirer.prompt(questions[0])
                    .then(answers => {
                        if (answers.pagination === 'exit') {
                            process.exit()
                        }
                        offset += answers.pagination
                    });
            }
        } else {
            await inquirer.prompt(questions[2])
                .then(answers => {
                    if (answers.paginationLast === 'exit') {
                        process.exit()
                    }
                    offset += answers.paginationLast
                });
        }
    }

}

run();