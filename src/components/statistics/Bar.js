import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { CHART_COLOR_PALETTE } from "@/utils/constants";

export default function Bar({ data }) {
  const transformData = (data) => {
    const transformedData = [];

    data.forEach((item) => {
      const categoryData = {
        id: item.id,
      };

      item.data.forEach((subItem) => {
        categoryData[subItem.id] = subItem.value;
      });

      if (!Object.keys(categoryData).includes("undefined")) {
        transformedData.push(categoryData);
      }
    });

    return transformedData;
  };

  const transformedData = transformData(data);

  return (
    <div style={{ height: "600px" }}>
      <ResponsiveBar
        data={transformedData}
        keys={[
          "Machos solicitados",
          "Machos entregues",
          "Fêmeas solicitadas",
          "Fêmeas entregues",
        ]}
        indexBy="id"
        margin={{ top: 50, right: 60, bottom: 130, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={CHART_COLOR_PALETTE.colors}
        borderRadius={5}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Quantidade",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "top",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: -40, 
            itemsSpacing: 2,
            itemWidth: 135,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        theme={{
          labels: {
            text: {
              fill: "#ffffff",
              fontSize: 17,
              outlineWidth: 1,
              outlineColor: "#ffffff",
            },
          },
          tooltip: {
            container: {
              background: "#000000",
              color: "#ffffff",
              fontSize: "14px",
              borderRadius: "4px",
              boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.25)",
              padding: "12px",
            },
          },
          axis: {
            domain: {
              line: {
                stroke: "#ffffff",
                strokeWidth: 1,
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#ffffff",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
            ticks: {
              line: {
                stroke: "#ffffff",
                strokeWidth: 1,
              },
              text: {
                fontSize: 11,
                fill: "#ffffff",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
          },
          legends: {
            title: {
              text: {
                fontSize: 11,
                fill: "#ffffff",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
            text: {
              fontSize: 11,
              fill: "#ffffff",
              outlineWidth: 0,
              outlineColor: "transparent",
            },
            ticks: {
              line: {},
              text: {
                fontSize: 10,
                fill: "#ffffff",
                outlineWidth: 0,
                outlineColor: "transparent",
              },
            },
          },
        }}
      />
    </div>
  );
}
