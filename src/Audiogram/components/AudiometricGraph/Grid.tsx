import React from 'react';

import VxGrid from './Grid/VxGrid';

import { frequencyTickValues } from '../../labels';

interface IGridProps {
    scales: any;
    width: number;
    xMax: number;
    yMax: number;
}

const Grid: React.SFC<IGridProps> = props => {
    return (
        <VxGrid
            xScale={props.scales.frequencyScale}
            yScale={props.scales.amplitudeScale}
            stroke="#c8c8cf"
            strokeWidth="1 px"
            numTicksColumns={10}
            columnTickValues={frequencyTickValues(props.width, 'ALL_GRID_LINE_VALUES')}
            width={props.xMax}
            height={props.yMax}
        />
    );
};

export default Grid;
