const gulp = require("gulp");
const through2 = require("through2");
const markdownlint = require("markdownlint");

gulp.task("markdownlint", function task() {
  return gulp.src(["./**/*.md","!./node_modules/**"], { "read": false })
    .pipe(through2.obj(function obj(file, enc, next) {
      markdownlint(
        { "files": [ file.relative ] },
        function callback(err, result) {
          const resultString = (result || "").toString();
          if (resultString) {
            console.log(resultString);
          }
          next(err, file);
        });
    }));
});