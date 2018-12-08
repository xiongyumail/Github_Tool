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
                radius : [50, 160],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    },
    currentIndex: -1,
    timebasedata: [],
    option2: {
        title: {
            text: 'Count',
            left: 0
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: []
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        toolbox: {
            feature: {
                dataView : {show: true, readOnly: false},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            data: [],
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: {
            scale: true,
            splitArea: {
                show: true
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            {
                show: true,
                type: 'slider',
                y: '90%',
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: 'MA5',
                type: 'line',
                data: [],
                smooth: true,
                lineStyle: {
                    normal: {opacity: 0.5}
                }
            },
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
    },
    getDatelist: function (start_Date,end_Date) 
    {
        var time = new Date(start_Date);
        var list = [];
        while (time.getTime() <= end_Date.getTime()) {
            list.push(time.getUTCFullYear() + '/' + (time.getUTCMonth()+1) + '/' + time.getUTCDate());
            time.setDate(time.getDate()+1);
        }
        for (var i in list) {
            charts.timebasedata[i] = new Array();
            charts.timebasedata[i][1] = new Array();
            charts.timebasedata[i][2] = new Array();
            charts.timebasedata[i][0] = list[i];
        }
        return list;
    }
}