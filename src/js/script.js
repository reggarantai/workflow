global.jQuery = require('jquery');
bootstrap = require('bootstrap');
mustache = require('mustache');
jQuery(document).ready(function($){
  var jqxhr = jQuery.getJSON('images.json',function(){

  }).done(function(data){
    var template = jQuery('#templatez').html();
    var showTemplate = mustache.render(template, data);
    jQuery('#galleryz').html(showTemplate);
  });
});
