# AXMOS CLI todo list
AXMOS is a todo list which is running in the command line,
with command axmos you can execute it.
Below you find CLI Reference with all commands.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=flat&logo=yarn&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

## Getting Started
Instructions on how to get a copy of the project up and running on your local machine.
```bash
git clone https://github.com/mwiedenbach/axmos.git
# After clone is done
# you can provide the npm run or yarn build command
# Compiles a Sea file (Single executable application) under the build directory
yarn build
# to run the application execute:
./build/axmos
```

## Usage
axmos operation id/description

## CLI-References
| Command                                   | Explanation                       |
|-------------------------------------------|-----------------------------------|
| axmos create "description"                | Creates a new todo                |
| axmos delete id                           | every single todo has an id       |
| axmos list                                | lists all todos and also the id   |
| axmos check id                            | checks a todo                     |
| axmos uncheck id                          | unchecks a todo                   |


## License
This project is licensed under the [MIT] - see the [LICENSE.txt](LICENSE.txt) file for details.
