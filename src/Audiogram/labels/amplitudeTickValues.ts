const amplitudeTickValues = (size: number): number[] => {
    // In dB HL from -10 to 120 - 14 steps for large, 7 steps for small
    return size > 250 ? Array.from(Array(14), (_, n) => (n - 1) * 10) : Array.from(Array(7), (_, n) => n * 20);
};

export default amplitudeTickValues;
