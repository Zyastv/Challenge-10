const inquirer  = require("inquirer");
const Manager = require('./lib/manager')
const Engineer = require('./lib/engineer')
const Intern = require('./lib/intern')
const path = require('path')
const fs = require('fs')

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/htmlRenderer")

var employeeArr = []

function continueAdd(){
  inquirer.prompt([
    {
      message: 'Would you like to add another team member?',
      type: 'list',
      choices: ['Yes', 'No'],
      name: 'yesNo'
    }
  ])
  .then(yesNo=>{
    if(yesNo.yesNo === 'Yes'){
      addEmployee()
    } else if (yesNo.yesNo === 'No'){
      createHtml()
    }
  })
}

function addEmployee(){
  inquierer.prompt([{
    message: 'Do you want to add an engineer or an intern?',
    type: 'list',
    choices: ['Engineer', 'Intern'],
    name: 'employee'
  }])
  .then(employee=>{
    if(employee.employee === 'Engineer'){
      inquirer.prompt([
        {
          message: 'What is their name?: ',
          type: 'input',
          name: 'name'
        },
        {
          message: 'Whats their email?: ',
          type: 'input',
          name: 'email'
        },
        {
          message: 'Whats their Id?: ',
          type: 'input',
          name: 'id'
        },
        {
          message: 'What is their github username?: ',
          type: 'input',
          name: 'github'
        }
      ])
      .then(engineer =>{
        var newEngineer = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github)
        employeeArr.push(newEngineer)
      })
    } else if(employee.employee === 'Intern'){
      inquirer.prompt([
        {
          message: 'What is their name?: ',
          type: 'input',
          name: 'name'
        },
        {
          message: 'Whats their email?: ',
          type: 'input',
          name: 'email'
        },
        {
          message: 'Whats their Id?: ',
          type: 'input',
          name: 'id'
        },
        {
          message: 'What school do they go to?: ',
          type: 'input',
          name: 'school'
        }
      ])
      .then(intern=>{
        var newintern = new Intern(intern.name, intern.id, intern.email, intern.school)
        employeeArr.push(newintern)
      })
    }
})
continueAdd()
}

inquirer.prompt([
  {
    message: 'Who is the manager for your team?: ',
    type: 'input',
    name: 'name'
  },
  {
    message: 'Whats their email?: ',
    type: 'input',
    name: 'email'
  },
  {
    message: 'Whats their Id?: ',
    type: 'input',
    name: 'id'
  },
  {
    message: 'What is their office number?: ',
    type: 'input',
    name: 'officeNumber'
  }
])
.then(manager=>{
  var newManager = new Manager(manager.name, manager.id, manager.email, manager.officeNumber)
  employeeArr.push(newManager)
  addEmployee()
})

