
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', msg : 'This is index page' });
};