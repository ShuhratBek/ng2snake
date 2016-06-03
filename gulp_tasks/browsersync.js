const gulp = require('gulp');
const browserSync = require('browser-sync');

const browserSyncConf = require('../conf/browsersync.conf');
const browserSyncDistConf = require('../conf/browsersync-dist.conf');

gulp.task('browsersync', browserSyncServe);
gulp.task('browsersync:dist', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init(browserSyncConf());
  done();
}

function browserSyncDist(done) {
  browserSync.init(browserSyncDistConf());
  done();
}
