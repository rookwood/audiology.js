import * as React from 'react';
import { Axes, Background, Grid } from './AudiometricGraph';

interface IGraphProps {
    size: { x: number; y: number; xMax: number; yMax: number };
}

const Graph: React.SFC<IGraphProps> = props => {
    return (
        <g>
            <Axes />
            <Grid />
            <Background />
        </g>
    );
};

export default Graph;
