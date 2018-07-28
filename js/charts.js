var charts = {
    option: {
        title : {
            text: 'Github issues',
            subtext: "",
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:[],
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'driver',
                type:'pie',
                radius : [30, 110],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                ]
            }
        ]
    },
    analysis: function (data,list,time) {
        charts.option.title.subtext =  'driver issues analysis' + " (time since: " + issue.timesince + ")";
        charts.option.legend.data = list;
        charts.option.series[0].data = [];
        for (var li in list) {
            charts.option.series[0].data[li] = {value: 0, name: list[li]};
            for (var i in data) {
                if (data[i].type.includes(list[li]) == true) {
                    charts.option.series[0].data[li].value++;
                }
            }
        }
        return charts.option;
    }
}