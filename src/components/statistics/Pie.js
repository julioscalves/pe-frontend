import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { CHART_COLOR_PALETTE } from "@/utils/constants";

function Pie({ data }) {
  const transformedData = data.filter((item) => item.id !== undefined);
  return (
    <div style={{ height: "400px" }}>
      <ResponsivePie
        data={transformedData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={10}
        cornerRadius={3}
        colors={CHART_COLOR_PALETTE.colors}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsTextColor="#ffffff"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#ffffff"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#ffffff"
        theme={{
          text: {
            fontSize: 17,
            fill: "#ffffff",
            outlineWidth: 1,
            outlineColor: "transparent",
          },
          labels: {
            text: {
              fill: '#ffffff',
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
        }}
      />
    </div>
  );
}

export default Pie;
