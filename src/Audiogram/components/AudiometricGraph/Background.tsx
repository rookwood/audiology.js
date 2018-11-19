import React from 'react';

import { LinearGradient } from '@vx/gradient';
import { Group } from '@vx/group';

interface IBackgroundProps {
    width: number;
    height: number;
}

const Background: React.SFC<IBackgroundProps> = props => (
    <Group className="background-gradient">
        <LinearGradient id="gradient" from="#fdfbfb" to="#ebedee" fromOpacity={0.75} toOpacity={0.75} rotate={120} />
        <rect x={0} y={0} width={props.width} height={props.height} fill="url('#gradient')" />
    </Group>
);

export default Background;
