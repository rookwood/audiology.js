import { amplitudeTickValues } from '../../src/Audiogram/labels';

describe('Amplitude axis labels', () => {
    test('On full size graphs, label in 10 dB increments', () => {
        const labels = amplitudeTickValues(500);

        expect(labels.length).toBe(14);
    });

    test('On smaller graphs, limit to 20 dB increments', () => {
        const labels = amplitudeTickValues(100);

        expect(labels.length).toBe(7);
    });
});
