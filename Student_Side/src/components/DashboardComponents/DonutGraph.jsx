import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

export default function DoughNut(props) {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState("250");
    useEffect(() => {
        const handleResize = () => {
            if (width < 780) {
                setHeight("220");
            }
            if (width < 500) {
                setHeight("250");
            }
            setWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);
    });
    // Donut Graph
    const state = {
        series: props.pdp,
        options: {
            chart: {
                type: "donut",
            },
            labels: ["Not Attended", "Attended"],
            legend: {
                show: false,
            },
            colors: ["#5299FF", "#004BB8"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300,
                        },
                    },
                },
            ],
        },
    };
    return (
        <div
            className="flex justify-center mt-4 items-center relative"
            style={{
                width: "100%",
                height: "200px",
                padding: "0px 20px",
                background: "white",
            }}
        >
            <h1 className="font-bold text-5xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {`${Math.round(
                    (props.pdp[1] * 100) / (props.pdp[0] + props.pdp[1])
                )}%`}
            </h1>
            <ReactApexChart
                options={state.options}
                series={state.series}
                type="donut"
                height={height}
            />
        </div>
    );
}
