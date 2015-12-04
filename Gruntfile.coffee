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

  #Load Tasks
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'compile', ['coffee']