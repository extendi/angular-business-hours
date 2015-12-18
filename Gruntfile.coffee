module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    
    coffee:
      coffee_to_js:
        options:
          bare: true
          sourceMap: true
        expand: true
        flatten: false
        cwd: "src"
        src: ["**/*.coffee"]
        dest: 'dist'
        ext: ".js"

    ngtemplates:
      app:
        options:
          module: "extendi.business-hours.tpl"
          standalone: true
        src: "templates/*.html"
        dest: "dist/angular-business-hours.tpl.js"

  #Load Tasks
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-angular-templates'
  
  grunt.registerTask 'compile', ['coffee', 'ngtemplates']