module.exports = function (config) {
    config.set({
        basePath: './src/',

        files: [
            'vendor/jquery/jquery.js',
            'vendor/angular/angular.js',
            'vendor/angular/angular-*.js',
            'vendor/angular-ui/unique.js',
            'vendor/fuse/fuse.js',
            'vendor/showdown/Showdown.js',
            'vendor/bootstrap/bootstrap.js',
            'app/app.js',
            'app/**/*.module.js',
            'app/**/*.js',
            'app/**/*.html'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        //        browsers: ['PhantomJS', 'Chrome'],

        reporters: ['dots', 'junit', 'coverage'],

        preprocessors: {
            'app/**/!(*.spec).js': 'coverage',
            'app/**/*.html': ['ng-html2js']
        },

        // load html template to cache
        ngHtml2JsPreprocessor: {

            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('htmlTemplates')
            moduleName: 'htmlTemplates'
        },

        junitReporter: {
            outputFile: '../test_out/unit.xml',
            suite: 'unit'
        },

        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: '../coverage/',
                    // supprime les dossiers spécifiques à chaque browser
                    subdir: '.'
                }
//                {
//                    // sortie console
//                    type: 'text'
//                }
          ]
        },

    });
};
