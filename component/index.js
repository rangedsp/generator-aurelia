var generators = require('yeoman-generator');
module.exports = generators.NamedBase.extend({

    generateAureliaVM: function() {
        this.fs.copyTpl(
            this.templatePath('vm.js'),
            this.destinationPath('src/components/' + this.name + '/' + this.name + '.js'),
            { ComponentName: this.name }
        );
    },
    generateAureliaView: function() {
        this.fs.copyTpl(
            this.templatePath('view.html'),
            this.destinationPath('src/components/' + this.name + '/' + this.name + '.html'),
            {
                ComponentName: this.name,
                Hello: '${hello}'
            }
        );
    }
});
