# Lifen Frontend Challenge

This is my way of doing the Lifen Frontend Challenge.

In order to be more efficient and fast, I used :
- React : https://reactjs.org/
- Create React App : https://github.com/facebook/create-react-app
- React Dropzone : https://github.com/react-dropzone/react-dropzone
- Electron : https://electronjs.org/
- Chokidar : https://github.com/paulmillr/chokidar

## How to make it work

First, clone the project and install the dependencies :
```
git clone https://github.com/mandawino/frontend-jobs.git
cd lifen
yarn
```

#### Run in production mode
To run it as would be the application in production, create your packaged version :
```
yarn electron-pack
```
Wait for the end of the command, then you can go to the **dist** folder and launch the electron application **lifen**.



#### Run in development mode
To run it and see the changes as you're developing :
```
yarn electron-dev
```
The app will start automatically.