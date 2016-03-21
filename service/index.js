var generators = require('yeoman-generator');
module.exports = generators.NamedBase.extend({

    generateAureliaService: function() {
        this.fs.copyTpl(
            this.templatePath('service.js'),
            this.destinationPath('src/services/' + this.name + '.js'),
            { ServiceName: this.name }
        );
    }
});
