module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: ['bootstrap/dist/css/*'],
            dest: 'dist/css/'
          },
          {
            expand: true,
            flatten: true,
            src: ['bootstrap/dist/js/*'],
            dest: 'dist/js/'
          },
          {
            expand: true,
            flatten: true,
            src: ['bootstrap/dist/fonts/*'],
            dest: 'dist/fonts/'
          },
          {
            expand: true,
            flatten: true,
            src: ['templates/*'],
            dest: 'dist/'
          }
        ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
//  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('dist', function () {
    var done = this.async();
    grunt.util.spawn({
      grunt: true,
      args: [''],
      opts: {
        cwd: 'bootstrap/'
      }
    }, function (err, result, code) {
      done();
    });
  });

  grunt.registerTask('default', ['dist', 'copy']);
};