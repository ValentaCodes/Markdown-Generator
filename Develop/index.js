// Imports the modules/dependencies we need to run app
const inquirer = require("inquirer");
const fs = require("fs");

// An array of questions we will ask user in command line
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: function (input) {
      const done = this.async();
      setTimeout(function () {
        if (input === "") {
          done("You must enter a title for your project");
          return;
        }
        done(null, true);
      }, 500);
    },
  },
  {
    type: "input",
    name: "description",
    message: "Describe your project.",
  },
  {
    type: "input",
    name: "tools",
    message: "List the tools you used in the process?",
  },
  {
    type: "input",
    name: "motivation",
    message: "What was the motivation to build this project?",
  },
  {
    type: "input",
    name: "instructions",
    message: "What are the steps required to install your project?",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide instructions and examples for use.",
  },
  {
    type: "input",
    name: "guidelines",
    message: "What are the guidelines for contributing?",
  },
  {
    type: "input",
    name: "testing",
    message: "If you wrote tests, provide examples on how to run them here.",
  },
  {
    type: "list",
    message: "What license will this project have?",
    name: "license",
    choices: ["MIT", "Apache2.0", "ISC", "BSD"],
  },
  {
    type: "input",
    message: "What is your github username?",
    name: ["questions", "github"],
  },
  {
    type: "input",
    message: "Enter your email address.",
    name: ["questions", "email"],
  },
];

// This function allows us to format our file. Here we have a README template.
const README = (answers) => {
  let license = answers.license;
  let lowerCaseLicense = license.toLowerCase();
  return `# ${answers.title}

---

![License](https://img.shields.io/badge/License-${answers.license}-blue)

## *Table of Contents*

- [Description](#description)
- [Tools](#tools)
- [Motivation](#motivation)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Testing](#testing)
- [License](#license)
- [Screenshots](#screenshots)
- [Questions](#questions)

## **Description**

  ${answers.description}

## **Tools**

  ${answers.tools}

## **Motivation**

  ${answers.motivation}

## **Installation**
  
  ${answers.instructions}

## **Usage**

  ${answers.usage}

## **Contribution**

  ${answers.guidelines}
  
## **Testing**

  ${answers.testing}

## **Screenshots**

  Add your screenshots here:

  ![ALT TEXT](URL)

## **Links**
  
  Add any relevant links for this project below:

  [Your Website](URL)

## License

  This project is licensed under the terms of the ${answers.license} license.

  Detailed information about this license can be found here: [License Info](https://choosealicense.com/licenses/${lowerCaseLicense})

## Questions

  Any question about this project contact me here:

- [Github](https://github.com/${answers.questions.github})
- <${answers.questions.email}>
  `;
};

// This function creates our file.
function writeToFile(fileName) {
  fileName = "../markdown/README.md";
  inquirer.prompt(questions).then((answers) => {
    const readMePageContent = README(answers); // We are storing our readme function into a variable so we can access it's data below

    // Here we initialize our README, add our template along with the users answers.
    fs.writeFile(fileName, readMePageContent, (error) =>
      error
        ? console.log(error)
        : console.log("Success! check the markdown folder.")
    );
  });
}

// This is our initialization function the fires given functions when called.
function init() {
  writeToFile();
}

// Function call to initialize app
init();
