# SDCoin Wallet

## Run for development

### Installation

1. To go into the project root
2. `npm install` to install the website's npm dependencies

### Running project in browser

### Config

When running or deploying an application, you can set configuration variables in directory `/config/`, a full list can be found below.

| Variable                     | Description                                                                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **-**                        |                                                                                                                                             |

1. `npm start` to start the hot-reloading development server
2. `http://localhost:8080` to open the app in your favorite browser

## Cordova

### Build project

1. `npm run build` Build and put the project in a folder /www
2. `cordova prepare`
3. `cordova build android` or `cordova build ios`

### Run project
1. `cordova run android` or `cordova run ios`

## Using STYLELINT

Settings IDE (vscode) 

Install plugins:

- **[stylelint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint)**
- **[prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**

user settings.json

    {
    	"[scss]": {
    		"editor.formatOnSave": true
    	},
    	"files.autoSave": "onFocusChange",
    	"prettier.stylelintIntegration": true,
    	"prettier.useTabs": true
    }
## Configure project for CI/CD

1. Change the `$DOCKER_REPOSITORY_URL` var in the `.gitlab-ci.yml` file
2. If is ECR used as docker repository, configure `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` vars in Settings->CI/CD->Variables
