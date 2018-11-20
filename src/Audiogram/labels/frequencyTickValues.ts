const frequencyTickValues = (size: number): number[] => {
    return size >= 200 ? [250, 500, 1000, 2000, 4000, 8000] : [250, 1000, 8000];
};

export default frequencyTickValues;
