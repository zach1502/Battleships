# React Application Setup Guide (Linux)

### 1. Installing Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. You will need Node.js to run this application.

To install Node.js on Ubuntu, you can use the apt package manager. First, update your local package index:

```bash
sudo apt update
```

Then, install Node.js:

```bash
sudo apt install nodejs
```

You can verify the installation by checking the version of Node.js:

```bash
nodejs --version
```

### Installing Yarn
Yarn is a package manager for your code, similar to npm but providing some additional features. This project uses Yarn for managing dependencies and running scripts.

You can install Yarn through the npm package manager (which comes bundled with Node.js):

```bash
npm install --global yarn
```

To verify the installation, check the version of Yarn:

```bash
yarn --version
```

## Building and Running the Application

### Cloning the project
First, clone our project to your local machine. Open your terminal and navigate to the directory where you want the project to be. Then, use the following command:


### Installing dependencies
Next, navigate to the project directory and install the project's dependencies:

```bash
cd our_project_directory/"[Assets]"
yarn install
```

### Optional: Running the Dev server instead of the production build
It is more or less the same thing as building but its just faster for you guys to test the app.
If you really want to build the app instead, skip this.
To run the application in development mode, use the following command:

```bash
yarn start
```

This will start a local development server. You can then open a web browser and visit `http://localhost:3000` to view your running application.

### WARNING!!!
You may need to now open the developer console (`F12` or `Ctrl+Shift+I`) and run the following command in your browser.
localStorage is used to store the user's data and since the last phase, we have changed the way we store the data.
```js
localStorage.clear()
```

### Actually building the application
To build a production-ready version of the application, run the following command:

```bash
yarn build
```

This command will create a `build` directory in your project which contains a version of the app that is optimized for production.

### Running the application (production mode)

To serve the production-ready build, you would need to use a static server. For instance, you can install the `serve` package via Yarn:

```bash
yarn global add serve
```

Then serve your production-ready build by:

```bash
serve -s build
```

The app is now running and ready for use!
Go to the localhost:3000 (or whatever it says) to view the app.
```
