import { Ear, IResponseShape } from '../../src/Audiogram/Response';
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
});
