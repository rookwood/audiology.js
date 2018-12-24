import React from 'react';

import { AxisBottom, AxisLeft, AxisRight, AxisTop } from '@vx/axis';
import { Group } from '@vx/group';

import { amplitudeTickValues } from '../../labels';
import { frequencyTickValues } from '../../labels';
import { frequencyTickFormat } from '../../labels';

interface IAxesProps {
    scales: any;
    width: number;
    yMax: number;
    xMax: number;
}

const Axes: React.SFC<IAxesProps> = props => (
    <Group>
        <AxisTop
            top={0}
            stroke="#333333"
            strokeWidth={1}
            tickTextFill="#6600ff"
            scale={props.scales.frequencyScale}
            hideTicks={true}
            tickFormat={frequencyTickFormat(props.width)}
            tickValues={frequencyTickValues(props.width)}
            numTicks={6}
        />
        <AxisLeft
            top={-1}
            label="dB HL"
            stroke="#333333"
            tickTextFill="#6600ff"
            scale={props.scales.amplitudeScale}
            hideTicks={true}
            tickValues={amplitudeTickValues(props.width)}
        />
        <AxisBottom
            stroke="#333333"
            scale={props.scales.frequencyScale}
            hideTicks={true}
            numTicks={0}
            tickValues={[]}
            top={props.yMax}
        />
        <AxisRight stroke="#333333" left={props.xMax - 0.5} scale={props.scales.amplitudeScale} numTicks={0} />
    </Group>
);

export default Axes;
