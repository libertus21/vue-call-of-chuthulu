const gulp = require("gulp");
const clean = require("gulp-clean");
const rename = require("gulp-rename");
const rutaArchivo = "./src/components/login.vue"
const destinoArchivoRuta  = "./src/assets/imagenes"
gulp.task("eliminarArchivos", function() {
    return gulp.src(rutaArchivo, { read: false })
    .pipe(clean());
});

gulp.task("copiarArchivos", function() {
    return gulp.src(rutaArchivo)
    .pipe(gulp.dest(destinoArchivoRuta));
});

gulp.task("cambiarNombres", function() {
    return gulp.src(rutaArchivo)
    .pipe(rename("QLQ.vue"))
    .pipe(gulp.dest(destinoArchivoRut));
});
