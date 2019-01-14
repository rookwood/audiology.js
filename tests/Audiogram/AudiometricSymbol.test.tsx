import { render } from 'enzyme';
import React from 'react';

import { Point } from '@vx/point';

import AudiometricSymbol from '../../src/Audiogram/components/AudiometricSymbol';

describe('Auiometric symbols', () => {
    test('Render a gylph to mark a response', () => {
        const symbol = render(
            <svg>
                <AudiometricSymbol
                    type="left.air.unmasked"
                    plot={new Point({ x: 50, y: 50 })}
                    color="#004"
                    glyphScale={1}
                    tightenSpacing={false}
                />
            </svg>,
        ).children();

        expect(symbol.length).toBe(1);
        expect(symbol.find('path').length).toBe(1);
    });

    test('Throw an error when attempting to use an invalid icon', () => {
        expect(() => {
            return render(
                <svg>
                    <AudiometricSymbol
                        type="invalid.icon.test"
                        plot={new Point({ x: 50, y: 50 })}
                        color="#004"
                        glyphScale={1}
                        tightenSpacing={false}
                    />
                </svg>,
            );
        }).toThrowError();
    });
});
