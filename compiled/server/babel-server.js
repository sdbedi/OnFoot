'use strict';

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('../webpack.config.js');

var app = express();
var compiler = webpack(config);

app.use(express.static(__dirname + '/../src/static/bundle.js'));
//app.use(webpackMiddleware(compiler));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.listen(3030);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NlcnZlci9iYWJlbC1zZXJ2ZXIuanMiXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUiLCJleHByZXNzIiwid2VicGFjayIsIndlYnBhY2tNaWRkbGV3YXJlIiwiY29uZmlnIiwiYXBwIiwiY29tcGlsZXIiLCJ1c2UiLCJzdGF0aWMiLCJfX2Rpcm5hbWUiLCJnZXQiLCJyZXNwb25zZSIsInJlcSIsInJlcyIsInNlbmRGaWxlIiwiam9pbiIsImxpc3RlbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJQSxPQUFPQyxRQUFRLE1BQVIsQ0FBWDtBQUNBLElBQUlDLFVBQVdELFFBQVEsU0FBUixDQUFmO0FBQ0EsSUFBSUUsVUFBVUYsUUFBUyxTQUFULENBQWQ7QUFDQSxJQUFJRyxvQkFBb0JILFFBQVEsd0JBQVIsQ0FBeEI7QUFDQSxJQUFJSSxTQUFTSixRQUFRLHNCQUFSLENBQWI7O0FBRUEsSUFBTUssTUFBTUosU0FBWjtBQUNBLElBQU1LLFdBQVdKLFFBQVFFLE1BQVIsQ0FBakI7O0FBRUFDLElBQUlFLEdBQUosQ0FBUU4sUUFBUU8sTUFBUixDQUFlQyxZQUFZLDBCQUEzQixDQUFSO0FBQ0E7QUFDQUosSUFBSUssR0FBSixDQUFRLEdBQVIsRUFBYSxTQUFTQyxRQUFULENBQWtCQyxHQUFsQixFQUF1QkMsR0FBdkIsRUFBNEI7QUFDdkNBLE1BQUlDLFFBQUosQ0FBYWYsS0FBS2dCLElBQUwsQ0FBVU4sU0FBVixFQUFxQix1QkFBckIsQ0FBYjtBQUNELENBRkQ7O0FBSUFKLElBQUlXLE1BQUosQ0FBVyxJQUFYIiwiZmlsZSI6ImJhYmVsLXNlcnZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIGV4cHJlc3MgID0gcmVxdWlyZSgnZXhwcmVzcycpO1xudmFyIHdlYnBhY2sgPSByZXF1aXJlKCAnd2VicGFjaycpO1xudmFyIHdlYnBhY2tNaWRkbGV3YXJlID0gcmVxdWlyZSgnd2VicGFjay1kZXYtbWlkZGxld2FyZScpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoJy4uL3dlYnBhY2suY29uZmlnLmpzJyk7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IGNvbXBpbGVyID0gd2VicGFjayhjb25maWcpO1xuXG5hcHAudXNlKGV4cHJlc3Muc3RhdGljKF9fZGlybmFtZSArICcvLi4vc3JjL3N0YXRpYy9idW5kbGUuanMnKSk7XG4vL2FwcC51c2Uod2VicGFja01pZGRsZXdhcmUoY29tcGlsZXIpKTtcbmFwcC5nZXQoJyonLCBmdW5jdGlvbiByZXNwb25zZShyZXEsIHJlcykge1xuICByZXMuc2VuZEZpbGUocGF0aC5qb2luKF9fZGlybmFtZSwgJy8uLi9wdWJsaWMvaW5kZXguaHRtbCcpKTtcbn0pO1xuXG5hcHAubGlzdGVuKDMwMzApO1xuIl19