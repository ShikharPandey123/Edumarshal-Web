export default function columnCollection(p, t, s) {
    return {
        series: [
            {
                name: "Total Classes",
                data: t,
            },
            {
                name: "Classes Attended",
                data: p,
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            colors: ["#004BB8", "#5299FF"],
            xaxis: {
                categories: s,
            },
            yaxis: {
                title: {
                    text: "",
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + " Classes";
                    },
                },
            },
        },
    };
}
