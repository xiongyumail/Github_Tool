var github = {
    url: "",
    parameters: {
        page: {
            name: "page",
            value: ""
        },
        // Indicates the state of the issues to return. Can be either open, closed, or all. Default: open
        state: {
            name: "state",
            value: "all"
        },
        // What to sort results by. Can be either created, updated, comments. Default: created
        sort: {
            name: "sort",
            value: ""
        },
        since: {
            name: "since",
            value: ""
        }
    },
    config: function(repo,par)
    {
        var p;
        this.url = "https://api.github.com/repos" + repo + "/issues?";
        if (par == "default") {
            par = this.parameters;
        }
        for (p in par) {
            if (par[p].value != "")
                this.url = this.url + par[p].name + "=" + par[p].value + "&";
        }
        console.log(this.url);
        return this.url;
    },
    get: function(callback)
    {
        var xmlhttp;
        if (window.XMLHttpRequest)
        {
            //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp=new XMLHttpRequest();
        }
        else
        {
            // IE6, IE5 浏览器执行代码
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                callback(xmlhttp.responseText);
            }
        }
        xmlhttp.open("GET",this.url,true);
        xmlhttp.send();
    }
}

var issue = {
    page: 1,
    timesince: "",
    callback: undefined,
    issue_data: [],
    type_list: ["gpio","uart","i2c","spi","pwm","adc","i2s","rmt","ledc","pcnt","touch","sigmadelta"],
    ondata: function (data)
    {
        var json_data = JSON.parse(data);
        
        if (json_data.length != 0) {
            if (json_data[json_data.length - 1].created_at > issue.timesince) {
                issue.issue_data = issue.issue_data.concat(json_data);
                github.parameters.page.value = (issue.page++).toString(10);
                github.config("/espressif/esp-idf",github.parameters);
                github.get(issue.ondata); 
            } else {
                for (var i=0; i<json_data.length; i++) {    //search for some timesince.
                    if (json_data[i].created_at > issue.timesince) {
                        issue.issue_data.push(json_data[i]);
                    } else {
                        break;
                    }
                }
                console.log("last time issue: " + json_data[i].created_at);
                issue.callback(issue.select(issue.type_list,issue.issue_data));
            }
        } else {
            console.log("read all issues\n");
            issue.callback(issue.select(issue.type_list,issue.issue_data));
        }

    },
    get: function (timesince)
    {
        this.timesince = timesince;
        github.parameters.page.value = (issue.page++).toString(10);
        github.config("/espressif/esp-idf",github.parameters);
        github.get(this.ondata);
    },
    select: function (list,issue) {
        for (var t in issue) {
            issue[t].type = [];
            for (var li in list) {
                if (RegExp(list[li],"i").test(issue[t].title) == true) {
                    issue[t].type.push(list[li]);
                }
            }
        }
        return issue;
    }
}
