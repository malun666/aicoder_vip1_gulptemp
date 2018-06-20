/*
 * @Author: malun
 * @Date: 2018-06-20 18:22:53
 * @Last Modified by: malun
 * @Last Modified time: 2018-06-20 18:25:54
 * 跟后台打交道的所有的api都封装到此
 */

define(['jquery'], function($) {
  return {
    getUser: function(cb) {
      // 发送ajax请求，后台返回数据后，调用cb函数。
      $.ajax({url: '/api/userlist', type: 'GET', data: '', dataType: 'json', success: cb});
    }
  };
});
