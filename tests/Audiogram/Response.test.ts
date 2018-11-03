import { Ear, Modality, Response } from '../../src/Audiogram/Response';
describe('Response', () => {
    test('Build by passing in all required properties', () => {
        const response = new Response({
            amplitude: 20,
            ear: Ear.right,
            frequency: 500,
        });

        expect(response.amplitude).toBe(20);
        expect(response.ear).toBe('right');
        expect(response.frequency).toBe(500);
    });

    test('Optional properties have sensible defaults', () => {
        const response = new Response({
            amplitude: 20,
            ear: Ear.right,
            frequency: 500,
        });

        expect(response.masking).toBe(null);
        expect(response.modality).toBe('air');
        expect(response.noResponse).toBe(false);
        expect(response.stimulus).toBe('tone');
        expect(response.test).toBe('threshold');
    });

    test('Is this a bone conduction response?', () => {
        const boneResponse = new Response({
            amplitude: 20,
            ear: Ear.right,
            frequency: 500,
            modality: Modality.Bone,
        });

        const notBoneResponse = new Response({
            amplitude: 20,
            ear: Ear.right,
            frequency: 500,
            modality: Modality.Air,
        });

        expect(boneResponse.isBoneConduction()).toBe(true);
        expect(notBoneResponse.isBoneConduction()).toBe(false);
    });

    test('Type string is composed from ear, modality, and masking', () => {
        const responseA = new Response({
            amplitude: 20,
            ear: Ear.left,
            frequency: 500,
        });

        const responseB = new Response({
            amplitude: 20,
            ear: Ear.right,
            frequency: 500,
            masking: 50,
        });

        expect(responseA.type()).toBe('left.air.unmasked');
        expect(responseB.type()).toBe('right.air.masked');
    });

    test('Key is composed from type and frequency', () => {
        const response = new Response({
            amplitude: 20,
            ear: Ear.right,
            frequency: 500,
        });

        expect(response.key()).toBe('right.air.unmasked.500');
    });
});
