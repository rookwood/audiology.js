import { frequencyTickValues } from '../../src/Audiogram/labels';

describe('Determine which labels are displayed based upon rendered size', () => {
    test('When size is above 250 px, show all octave values', () => {
        expect(frequencyTickValues(9001).length).toBe(6);
        expect(frequencyTickValues(201).length).toBe(6);
    });

    test('When displaying a small graph, label only every other octave', () => {
        expect(frequencyTickValues(199).length).toBe(3);
        expect(frequencyTickValues(15).length).toBe(3);
    });

    test('Allow for returning intra-octaive values when needed to display grid lines', () => {
        expect(frequencyTickValues(600, 'ALL_GRID_LINE_VALUES').length).toBe(10);
    });
});
