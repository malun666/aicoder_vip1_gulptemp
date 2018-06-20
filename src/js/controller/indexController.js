// 第一： 配置依赖的模块的路径
require.config({
  paths: {
    jquery: '/lib/jquery.min',
    api: '/js/service/api'
  }
});
// 第二： 进行入口处理
require([
  'jquery', 'api'
], function($, api) {
  $(function() {
    $('#tt')
      .on('click', function(e) {
        // alert('ss');
        api
          .getUser(function(data) {
            console.log(data);
          });
      });
  });
});
