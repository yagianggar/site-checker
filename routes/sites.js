exports.site_list = function(req, res){
  res.render('your_sites', { title: 'Your Sites', msg : 'This is site page' });
};