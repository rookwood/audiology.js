import { Ear, IResponseShape, Modality, Response } from '../../src/Audiogram/Response';
import { ResponseCollection } from '../../src/Audiogram/ResponseCollection';

describe('ResponseCollection', () => {
    test('Construct from array of Responses', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.responses.length).toBe(rawResponses.length);
    });

    test('Get the next response', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.next(1).frequency).toBe(2000);
    });

    test('Determines if a <Line /> is required to the next Response', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: Ear.Right,
                frequency: 2000,
                no_response: true,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.needsLineToNextMarker(0)).toBe(true);
        expect(collection.needsLineToNextMarker(1)).toBe(false);
    });

    test('Filter responses by ear', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: Ear.Left,
                frequency: 2000,
                no_response: true,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);
        const filteredCollection = collection.filterByEar(Ear.Right);

        expect(filteredCollection.length).toBe(2);
        filteredCollection.forEach((response: Response) => {
            expect(response.ear).toBe('right');
        });
    });

    test('Filter responses by modality', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 500,
                modality: Modality.Bone,
            },
            {
                amplitude: 20,
                ear: Ear.Right,
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: Ear.Left,
                frequency: 2000,
                no_response: true,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);
        const filteredCollection = collection.filterByModality(Modality.Air);

        expect(filteredCollection.length).toBe(2);
        filteredCollection.forEach((response: Response) => {
            expect(response.modality).toBe('air');
        });
    });
});
