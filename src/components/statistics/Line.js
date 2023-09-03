import React from 'react';
import { ResponsiveLine } from '@nivo/line';

function Line({ data }) {
  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'X Axis',
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Y Axis',
          legendOffset: -40,
          legendPosition: 'middle',
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
      />
    </div>
  );
}

export default Line;