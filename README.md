# Excelator Chrome Extention

Excelator is a chrome extention developed using React. This plugin accepts a xml, xls, xlsx file and converts the data in the file to Json. Once the xml/xlsx file is parsed, the user is provided option to download the file containing parsed json.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To build the project, you will need to have node.js/npm installed in your system. The best way to do it according to me is using nvm.
You can follow the below link for Mac OS Installation of Nvm.

[Install Nvm](https://medium.com/@isaacjoe/best-way-to-install-and-use-nvm-on-mac-e3a3f6bc494d)

### Installing

Clone the repo into your local system using the below cmd.

```
git clone https://github.com/angadjot/excelator-chrome-extension.git
```

Go to the dir and run npm install. This will install all the necessary dependency packages.

```
cd excelator-chrome-extension
npm install
```

To build the plugin, run the below cmd

```
npm run build
```

## Deployment

In order to check extension, you will have to install it in Chrome. 

You can do the following to install it:

In Chrome, open the extension list by opening a new tab and running the following URL:

```
chrome://extensions/
```

Press the Load unpacked extension… button.

Browse to the build folder and press the OK button.

If everything goes right, you will have your extension installed in Chrome.

![Chrome Extention](https://github.com/angadjot/excelator-chrome-extension/blob/master/images/chrome_extention.png?raw=true)

![Extention Preview](https://github.com/angadjot/excelator-chrome-extension/blob/master/images/extention_preview.png?raw=true)

Alternatively, 

You can also run the below npm command.

```
npm start
```

This will start a development server and you will be able to see the Extention UI by opening the link

```
http://localhost:3000
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Building a Chrome Extension Using React](https://medium.com/@gilfink/building-a-chrome-extension-using-react-c5bfe45aaf36)
