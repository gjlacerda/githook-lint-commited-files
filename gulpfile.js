const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sh = require('shelljs');
const path = require('path');

const eslintConfig = {
    'parser': 'babel-eslint',
    'rules': {
        'semi': [2, 'always'],
        'quotes': [2, 'single', {allowTemplateLiterals: true}],
        'eqeqeq': 2,
        'no-console': 2,
        'no-debugger': 2
    },
    'env': {
        'browser': true,
        'node': true,
        'es6': true
    },
    'extends': ['eslint:recommended']
};

const filterFiles = arrFiles => {
    // Only .js files
    return arrFiles.filter(file => path.extname(file) === '.js');
};

gulp.task('js:lint', () => {
    const modifiedFiles = sh.exec('git diff --name-only HEAD', {silent: true}).stdout.trim();
    const arrFiles = filterFiles(modifiedFiles.split('\n'));
    gulp.src(arrFiles)
        .pipe(eslint(eslintConfig))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
