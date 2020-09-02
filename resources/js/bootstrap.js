window.axios = require('axios');
window.Popper = require('popper.js');
window.$ = window.jQuery = require('jquery');
window.moment = require('moment');
require('./vendor/daterangepicker');
require('chart.js');
require('bootstrap');

$(() => {
    $('[data-toggle="tooltip"]').tooltip()
});