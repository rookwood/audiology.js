import { Ear, Modality, Response } from '../../src/Audiogram/Response';

test('A Response is built by passing in all required properties', () => {
    const response = new Response({
        amplitude: 20,
        ear: Ear.Right,
        frequency: 500,
    });

    expect(response.amplitude).toBe(20);
    expect(response.ear).toBe('right');
    expect(response.frequency).toBe(500);
});

test('A Response has some defaults for other properties', () => {
    const response = new Response({
        amplitude: 20,
        ear: Ear.Right,
        frequency: 500,
    });

    expect(response.masking).toBe(null);
    expect(response.modality).toBe('air');
    expect(response.noResponse).toBe(false);
    expect(response.stimulus).toBe('tone');
    expect(response.test).toBe('threshold');
});

test('A Response knows if it is from bone conduction testing', () => {
    const boneResponse = new Response({
        amplitude: 20,
        ear: Ear.Right,
        frequency: 500,
        modality: Modality.Bone,
    });

    const notBoneResponse = new Response({
        amplitude: 20,
        ear: Ear.Right,
        frequency: 500,
        modality: Modality.Air,
    });

    expect(boneResponse.isBoneConduction()).toBe(true);
    expect(notBoneResponse.isBoneConduction()).toBe(false);
});

test('A Response can return its type', () => {
    const responseA = new Response({
        amplitude: 20,
        ear: Ear.Left,
        frequency: 500,
    });

    const responseB = new Response({
        amplitude: 20,
        ear: Ear.Right,
        frequency: 500,
        masking: 50,
    });

    expect(responseA.type()).toBe('left.air.unmasked');
    expect(responseB.type()).toBe('right.air.masked');
});

test('A Response can return a key consisting of type and frequency', () => {
    const response = new Response({
        amplitude: 20,
        ear: Ear.Right,
        frequency: 500,
    });

    expect(response.key()).toBe('right.air.unmasked.500');
});
