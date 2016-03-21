# generator-aurelia-es6

This is a fork of [zewa666's generator-aurelia](https://github.com/zewa666/generator-aurelia), with a few tweaks for my own personal preference.
Work in progress, I recommend the [original](https://github.com/zewa666/generator-aurelia) if you want stability and TypeScript.

### Main difference:
- Folder is structured in a [modlet](https://donejs.com/Features.html#section=section_Modlets) way, e.g. putting the view and its corresponding viewModel in the same folder.
- Subgenerators for service/components/pages.
- No longer download from the Skeleton App first, templates are local.
- Only support ES6 for now.

### TODO:
- Include CSS / LESS for modlets.
- Support other project types from the Skeleton App template.
- Find a more elegant way to do routes for sub folders.
 

This is a Yeoman Generator for the [Skeleton App](https://github.com/aurelia/skeleton-navigation) of the [Aurelia](http://www.aurelia.io/) platform. It sets up a standard navigation-style app using gulp to build your ES6 code with [Babel](http://babeljs.io). Karma/Jasmine testing is configured as well.

For more info please visit the official site: http://www.aurelia.io/

## Prerequisite
This generator will use [JSPM](http://jspm.io), Aurelias package manager of choice, which performs GitHub queries to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm registry config github` and following the prompts. If you choose to authorize jspm by an access token instead of giving your password (see GitHub Settings > Personal Access Tokens), `public_repo` access for the token is required.

## Running The App

> The recent update will take care of running `npm install` and `jspm install` after downloading the boilerplate app, so this shortens the process to get up and running.

1. Install all necessary components

  ```shell
  npm install -g yo generator-aurelia-es6 gulp jspm
  ```

2. Create a new project folder and move into it in the terminal

  ```shell
  mkdir YOUR_PROJECT_NAME
  cd YOUR_PROJECT_NAME
  ```
  
3. Execute the following command

  ```shell
  yo aurelia
  ```

4. To run the app, execute the following command:

  ```shell
  gulp watch
  ```
5. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

## Update the skeleton jspm dependencies
If you're inside your skeleton folder you can run the following command to update your installation and get the latest versions of the dependencies used:

  ```shell
  yo aurelia:update
  ```

## Command line options

### --skip-install
yo aurelia --skip-install will skip the npm and jspm install.

### --proxy
yo aurelia --proxy=http://my.proxy:8080 will install the skeleton app resepecting the given proxy settings

## Creating a new page
In order to create a new Aurelia Page just enter the following command inside your project root:

  ```shell
  yo aurelia:page YOURPAGENAME
  ```
  
## Creating a new component
Components are very similar to pages at the moment, more difference will come later.

  ```shell
  yo aurelia:component YOURCOMPONENTNAME
  ```
  
## Creating a new service

  ```shell
  yo aurelia:service YOURSERVICENAME
  ```

> If you get an error like `Error: spawn git ENOENT` when executing the yo command, you should check whether GIT is installed and accessible from the command line

This will create a View and ViewModel with the given name inside the ```./src``` folder

## Credits
Thanks to Vildan Softic for [generator-aurelia](https://github.com/zewa666/generator-aurelia), it's so awesome that I'm forking it
