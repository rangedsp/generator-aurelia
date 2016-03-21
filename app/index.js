var fs = require('fs');
var yeoman = require('yeoman-generator');
var debug = require('debug')('yeoman:environment');
var GitHubApi = require('github');
var exec = require('child_process').exec;


var Generator = module.exports = yeoman.generators.Base.extend({

    constructor: function() {
        yeoman.generators.Base.apply(this, arguments);
        this.option('skip-install');
    },

    init: function() {
        var done = this.async();

        var isWin = /^win/.test(process.platform);
        this.log.info('Running ' + (isWin ? '' : 'non-') + 'windows platform (' + process.platform + ')');

        var sourceRoot = this.sourceRoot();
        var destinationRoot = this.destinationRoot();

        if (isWin) {
            var moveCommand = 'xcopy "' + sourceRoot +  '\\*.*" "' + destinationRoot + '" /E /Y';
        } else {
            var moveCommand = 'mv -v "' + sourceRoot +'/"* "' + destinationRoot + '/"';
        }

        var makeDirectoryCommand = buildMakeDirectoryCommand.bind({
            isWin: isWin,
            destinationRoot: destinationRoot
        });

        var moveObjectCommand = buildMoveCommand.bind({
            isWin: isWin,
            destinationRoot: destinationRoot
        });

        var commands = [
            moveCommand,
            makeDirectoryCommand('pages'),
            makeDirectoryCommand('components'),
            makeDirectoryCommand('services'),
            moveObjectCommand('users.*', 'pages', 'users'),
            moveObjectCommand('child-router.*', 'pages', 'child-router'),
            moveObjectCommand('welcome.*', 'pages', 'welcome'),
            moveObjectCommand('nav-bar.html', 'components', 'nav-bar'),
            {
                command: moveObjectCommand('blur-image.js', 'services'),
                callback: function() {
                    done();
                }
            }
        ];

        execAll.call(this, commands, 0);
    },

    executeNPMInstall: function() {
        if (!this.options['skip-install']) {
            this.log.info('Executing NPM install');
            this.npmInstall(null);
        } else {
            this.log.skip('NPM install deliberately skipped');
        }
    },

    runJSPM: function() {
        if (!this.options['skip-install']) {
            this.log.info('Executing JSPM install');
            this.spawnCommand('jspm', ['install']);
        } else {
            this.log.skip('JSPM install deliberately skipped');
        }
    }
});

function execAll(commands, i) {
    var index = i;
    var commandObject = commands[index];
    if (!commandObject) { return; }

    var command = typeof commandObject === 'string'
        ? commandObject
        : commandObject.command;

    console.log(command);

    exec(command, function(error, stdout, stderr) {

        if (error !== null && error.code > 1) {
            this.env.error(error);
        }

        if (commandObject.callback) {
            commandObject.callback.call(this);
        }

        var nextIndex = index + 1;
        execAll.call(this, commands, nextIndex);
    }.bind(this));
}

function buildMakeDirectoryCommand(name) {
    if (this.isWin) {
        return makeDirectoryCommand = 'mkdir "' + this.destinationRoot + '\\src\\' + name + '"';
    } else {
        return makeDirectoryCommand = 'mkdir "' + this.destinationRoot + '/src/' + name + '"';
    } 
}

function buildMoveCommand(matches, destination, subfolder) {
    if (this.isWin) {
        subfolder = subfolder ? '\\' + subfolder : '';
        return 'robocopy "' + this.destinationRoot + '\\src" "' + this.destinationRoot + '\\src\\' + destination + subfolder + '" "' + matches + '" /MOV /njh /njs /ndl /nc /ns';
    } else {
        subfolder = subfolder ?  '/'  + subfolder : '';
        return 'mv -v "' + this.destinationRoot + '/src/"' + matches + ' "' + this.destinationRoot + '/src/' + destination + subfolder + '"';
    }
}

Generator.name = 'Generator Aurelia';
