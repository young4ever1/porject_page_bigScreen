function setEcharts(dom, option, data) {
    console.log(data);
    // * page1
    let optionList = {
        // * 折线图
        option1: {
            xAxis: {
                type: 'category',
                data: data.map(item => {
                    return item.name
                }),
                axisLabel: {
                    show: true,
                    textStyle: { color: '#000', fontSize: '30' },
                    lineStyle: { color: '#284a69' }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: { color: '#000', fontSize: '30' },
                    lineStyle: { color: '#284a69' }
                },
            },
            series: [
                {
                    type: 'line',
                    data: data.map(item => {
                        return item.value
                    }),

                }
            ]
        },
        option2: {
            xAxis: {
                type: 'category',
                axisLabel: {
                    show: true,
                    textStyle: { color: '#000', fontSize: '30' },
                    lineStyle: { color: '#284a69' }
                },
                data: data.map(item => {
                    return item.name
                }),
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    textStyle: { color: '#000', fontSize: '30' },
                    lineStyle: { color: '#284a69' }
                },
            },
            series: [
                {
                    type: 'bar',
                    data: data.map(item => {
                        return item.value
                    }),

                }
            ]
        },
    }


    let echartsInstance = echarts.init(dom);
    echartsInstance.setOption(optionList[option]);
}