// 第一： 配置依赖的模块的路径
require.config({
  paths: {
    jquery: '/lib/jquery.min',
    api: '/js/service/api',
    tpl: '/js/template/tpl'
  }
});
// 第二： 进行入口处理
require([
  'jquery', 'api', 'tpl'
], function($, api, tpl) {
  $(function() {
    $('#tt')
      .on('click', function(e) {
        // alert('ss');
        api
          .getUser(function(data) {
            console.log(data);
            var html = tpl('userlist', data);
            console.log(html);
            $('.box')
              .append(html)
              .append(tpl('user/add', {xname: 'aicoder.com'}));
          });
      });
  });
});
