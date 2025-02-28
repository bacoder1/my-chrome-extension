declare module '@canvasjs/react-charts' {
  import * as React from 'react';

  // Define the type for the component (adjust as needed)
  interface CanvasJSChartProps {
    [key: any]: any;
    CanvasJS: any;
    CanvasJSChart: any;
  }

  // Declare the component
  const CanvasJSChart: CanvasJSChartProps;
  export default CanvasJSChart;
}