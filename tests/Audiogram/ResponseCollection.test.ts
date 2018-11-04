import { Ear, IResponseShape, Modality, Response } from '../../src/Audiogram/Response';
import { ResponseCollection } from '../../src/Audiogram/ResponseCollection';

describe('ResponseCollection', () => {
    test('Construct from array of Responses', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.right,
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
                ear: Ear.right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.right,
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
                ear: Ear.right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: Ear.right,
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
                ear: Ear.right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: Ear.left,
                frequency: 2000,
                no_response: true,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);
        const filteredCollection = collection.filterByEar(Ear.right);

        expect(filteredCollection.length).toBe(2);
        filteredCollection.forEach((response: Response) => {
            expect(response.ear).toBe('right');
        });
    });

    test('Filter responses by modality', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 500,
                modality: Modality.Bone,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 1000,
            },
            {
                amplitude: 110,
                ear: Ear.left,
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

    test('Get the ear represented by a collection', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.ear).toBe('right');
    });

    test('Get the modality represented by a collection', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.left,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.modality).toBe('air');
    });

    test('Throw an error when attempting to get an ear or modality from an unpartitioned collection', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 500,
                modality: Modality.Bone,
            },
            {
                amplitude: 20,
                ear: Ear.left,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(() => collection.ear).toThrowError();
        expect(() => collection.modality).toThrowError();
    });

    test('Get new collection of responses filtered by ear or modality', () => {
        const ears: Ear[] = [Ear.right, Ear.left, Ear.both];
        const modalities: Modality[] = [
            Modality.Air,
            Modality.Bone,
            Modality.HearingAid,
            Modality.CochlearImplant,
            Modality.Soundfield,
        ];

        const rawResponses: IResponseShape[] = ears.reduce((responses: IResponseShape[], ear: Ear) => {
            return [
                ...responses,
                ...modalities.map(modality => ({
                    amplitude: 20,
                    ear,
                    frequency: 1000,
                    modality,
                })),
            ];
        }, []);

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.length).toBe(15);

        expect(collection.right().length).toBe(5);
        collection.right().forEach(response => {
            expect(response.ear).toBe(Ear.right);
        });

        expect(collection.left().length).toBe(5);
        collection.left().forEach(response => {
            expect(response.ear).toBe(Ear.left);
        });

        expect(collection.both().length).toBe(5);
        collection.both().forEach(response => {
            expect(response.ear).toBe(Ear.both);
        });

        expect(collection.air().length).toBe(3);
        collection.air().forEach(response => {
            expect(response.modality).toBe(Modality.Air);
        });

        expect(collection.bone().length).toBe(3);
        collection.bone().forEach(response => {
            expect(response.modality).toBe(Modality.Bone);
        });

        expect(collection.soundfield().length).toBe(3);
        collection.soundfield().forEach(response => {
            expect(response.modality).toBe(Modality.Soundfield);
        });

        expect(collection.aided().length).toBe(3);
        collection.aided().forEach(response => {
            expect(response.modality).toBe(Modality.HearingAid);
        });

        expect(collection.implant().length).toBe(3);
        collection.implant().forEach(response => {
            expect(response.modality).toBe(Modality.CochlearImplant);
        });
    });

    test('Partition responses by ear and modality', () => {
        const ears: Ear[] = [Ear.right, Ear.left, Ear.both];
        const modalities: Modality[] = [
            Modality.Air,
            Modality.Bone,
            Modality.HearingAid,
            Modality.CochlearImplant,
            Modality.Soundfield,
        ];

        const rawResponses: IResponseShape[] = ears.reduce((responses: IResponseShape[], ear: Ear) => {
            return [
                ...responses,
                ...modalities.map(modality => ({
                    amplitude: 20,
                    ear,
                    frequency: 1000,
                    modality,
                })),
            ];
        }, []);

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.partition().length).toBe(7);
    });

    test('Filter empty collections after partitioning', () => {
        const rawResponses: Array<IResponseShape> = [
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 500,
            },
            {
                amplitude: 20,
                ear: Ear.left,
                frequency: 1000,
            },
            {
                amplitude: 20,
                ear: Ear.right,
                frequency: 2000,
            },
        ];

        const collection = ResponseCollection.from(rawResponses);

        expect(collection.partition().length).toBe(2);
    });
});
