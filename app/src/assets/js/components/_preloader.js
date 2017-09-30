var NProgress = require('nprogress');
document.addEventListener('DOMContentLoaded', function() {
    NProgress.start();
});
window.addEventListener('load', function() {
    var body = document.body;
    var loader = document.getElementById('loader');
    body.classList.add('loaded');
    loader.classList.add('loader-fade');
    NProgress.done();
}, true);