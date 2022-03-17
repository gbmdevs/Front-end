var gulp = require('gulp');

// Ordems das Tasks

gulp.task('passo1', async function() {
	console.log('Hello world!')
});

// Criando as Tasks
gulp.task('default', gulp.series( 'passo1', async function(){
    console.log("Inicio Default");
}));
	