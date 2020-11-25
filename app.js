const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "Output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//const { listenerCount } = require("process");

const teamMembers = []
const idArray = []

function inquirerMenu() {
function makeManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?"
          },
          {
            type: "input",
            name: "managerId",
            message: "What is your manager's id?"
          },
          {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
          },
          {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
          },

    ]).then(function(answers){
      console.log("working")
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        teamMembers.push(manager)
        idArray.push(answers.managerId)
            // create team function here 
            makeTeam(); 

            }
    )
}

function makeEngineer() {
  inquirer.prompt([
    {
      type: "input",
      name: "engineerName",
      message: "What is your engineer's name?"
    },
    {
      type: "input",
      name: "engineerId",
      message: "What is your engineer's id?",
      
    },
    {
      type: "input",
      name: "engineerEmail",
      message: "What is your engineer's email?",
      
    },
    {
      type: "input",
      name: "engineerGithub",
      message: "What is your engineer's GitHub username?",
    },
  ]).then(answers => {
    const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
    teamMembers.push(engineer);
    idArray.push(answers.engineerId);
    makeTeam();
  });
}

function makeIntern() {
  inquirer.prompt([
    {
      type: "input",
      name: "internName",
      message: "What is your intern's name?"
    },
    {
      type: "input",
      name: "internId",
      message: "What is your intern's id?",
      
    },
    {
      type: "input",
      name: "internEmail",
      message: "What is your intern's email?",
      
    },
    {
      type: "input",
      name: "internSchool",
      message: "What is your intern's school?",
    },

  ]).then(answers => {
    const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
    teamMembers.push(intern);
    idArray.push(answers.internId);
    makeTeam();
  });
}

//write intern function and engineer function git 
function makeTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "What team member do you want to add?",
            choices: [
                "Intern", "Engineer", "Manager", "I don't want to add members"
             ]
        },
        // {
        //     type: "input",
        //     message: "What is the employee's name?",
        //     name: "employeeName"
        // },
        // {
        //     type: "input",
        //     message: "What is the employee's id?",
        //     name: "employeeId"
        // },
        // {
        //     type: "input",
        //     message: "What is the employee's email?",
        //     name: "employeeEmail"
        // },
        // {
        //     type: "input",
        //     message: "What is the Engineer's Github?",
        //     name: "github",
        //     //when: (userInput) => userInput.memberChoice === "Engineer"
        // },
        // {
        //     type: "input",
        //     message: "What's the Intern's school?",
        //     name: "school",
        //     //when: (userInput) => userInput.memberChoice === "Intern"
        // }
        // {
        //     type: "confirm",
        //     name: "newEmployee",
        //     message: "Would you like to add another team member?"
        // },

    ]).then(function(userChoice) {
        switch(userChoice.memberChoice) {
          case "Engineer":
            makeEngineer();
            break;
          case "Intern":
            makeIntern();
            break;
            case "Manager":
            makeManager();
            break;
          default:
            renderTeam();

        }
      });  
}

function renderTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    makeManager();    

    
    //makeTeam();
  }

inquirerMenu();





// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``
