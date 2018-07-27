# _GITHUB ISSUES WEB TOOL_  

这是一个网页版的issues分析工具，提供图形化的界面．　　

原有的Python脚本只能爬取一些简单的issue,而且不能自动给出统计分析．Python爬虫能力很强，但是想要爬取跟多的东西比较困难．因此改用JavaScript爬取issue. 后台可以使用Node.js构建web服务器．　

使用 Github 提供的API，从json中提取数据，利用echarts生成图表．

# HOW TO USE  

* 首先，体验一下Github提供的[API]<https://api.github.com/repos/espressif/esp-idf/issues?page=1&state=closed>,可以从json文本中看到第一页关闭的issue.

# TECHNOLOGY LIST  

## GitHub api

### Resources

* [REST API v3](https://developer.github.com/v3/)
  * 使用Get请求Json数据，可填入需要的参数进行Filter

## JavaScript  

### Resources

* [JavaScript 教程](http://www.runoob.com/js/js-tutorial.html)
  * 简单易懂  


## Echarts  

## Node.js  
