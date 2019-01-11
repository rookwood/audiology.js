const frequencyTickValues = (size: number, all?: string): number[] => {
    if (all === 'ALL_GRID_LINE_VALUES') {
        return [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
    }

    return size >= 200 ? [250, 500, 1000, 2000, 4000, 8000] : [250, 1000, 8000];
};

export default frequencyTickValues;
