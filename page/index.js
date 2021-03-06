var generators = require('yeoman-generator');
module.exports = generators.NamedBase.extend({

    generateAureliaVM: function() {
        this.fs.copyTpl(
            this.templatePath('vm.js'),
            this.destinationPath('src/pages/' + this.name + '/' + this.name + '.js'),
            { PageName: this.name }
        );
    },

    generateAureliaView: function() {
        this.fs.copyTpl(
            this.templatePath('view.html'),
            this.destinationPath('src/pages/' + this.name + '/' + this.name + '.html'),
            {
                PageName: this.name,
                Hello: '${hello}'
            }
        );
    }
});
