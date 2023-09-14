import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChart = ({ data }) => {
    console.log('PieChart Data:', data);

    const CustomTooltip = ({ datum }) => {
        return (
            <div style={{
                background: 'white',
                padding: '5px',
                border: 'none',
                borderRadius: '10px',
                color: 'black'
            }}>
                {datum.label}
            </div>
        );
    }

    return (
        <div style={{ height: "400px" }}>
            <ResponsivePie
                data={data.pieChartData}
                margin={{ top: 40, right: 80, bottom: 80, left: 200 }}
                startAngle={-180}
                innerRadius={0.5}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 0.2]]
                }}
                enableArcLinkLabels={false}
                enableArcLabels={false}
                theme={{
                    fontFamily: 'Roboto',
                    labels: {
                        fontSize: 16
                    },
                    legends: {
                        text: {
                            fontSize: 16
                        }
                    }
                }}
                colors={['#e8f5e9', '#e1f5fe', '#ede7f6', '#ffebee', '#e0f2f1']}
                legends={[
                    {
                        anchor: 'left',
                        direction: 'column',
                        justify: false,
                        translateX: -100,
                        translateY: 0,
                        itemsSpacing: 10,
                        itemWidth: 100,
                        itemHeight: 24,
                        itemTextColor: '#000',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#999'
                                }
                            }
                        ]
                    }
                ]}
                tooltip={CustomTooltip}
            />
        </div>
    );
};

export default PieChart;
