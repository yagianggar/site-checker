exports.site_list = function(req, res){
  res.render('your_sites', { title: 'Your Sites', msg : 'This is site page' });
};

exports.add = function(req, res){
  res.render('add_sites', { title: 'Add New Sites', msg : 'This is site page' });
};