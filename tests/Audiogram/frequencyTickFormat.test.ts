import { frequencyTickFormat } from '../../src/Audiogram/labels';

describe('Formatting axis labels based on graph size', () => {
    test('When the graph is sufficiently large, render normal labels', () => {
        const formatLabel = frequencyTickFormat(600);

        expect(formatLabel(1000)).toBe('1 kHz');
        expect(formatLabel(250)).toBe('250 Hz');
        expect(formatLabel(4000)).toBe('4 kHz');
    });

    test('When graph size is reduced, abbreviate labels', () => {
        const formatLabel = frequencyTickFormat(200);

        expect(formatLabel(1000)).toBe('1k');
        expect(formatLabel(250)).toBe('250');
        expect(formatLabel(4000)).toBe('4k');
    });
});
