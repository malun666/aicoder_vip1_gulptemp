// 第一： 配置依赖的模块的路径
require.config({
  shim: {
    easyui: ['jquery'],
    easyuizc: ['jquery']
  },
  paths: {
    jquery: '/lib/jquery.min',
    api: '/js/service/api',
    tpl: '/js/template/tpl',
    easyui: '/lib/jquery-easyui-1.5.5.2/jquery.easyui.min',
    easyuizc: '/lib/jquery-easyui-1.5.5.2/locale/easyui-lang-zh_CN'
  }
});
// 第二： 进行入口处理
require([
  'jquery', 'api', 'tpl', 'easyui', 'easyuizc'
], function($, api, tpl, easyui, easyuizc) {
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

    $('#btn').on('click', function(e) {
      $('.dialog').dialog({
        title: '我是老马的对话框！',
        width: 400,
        height: 400,
        modal: true,
        content: tpl('product/info', {
          title: 'aicoder.com',
          list: ['老马', '管']
        })
      });
    });
  });
});
