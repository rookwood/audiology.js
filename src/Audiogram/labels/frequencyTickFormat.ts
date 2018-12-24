function frequencyTickFormatFunction(size: number): (value: number, index?: number) => string {
    if (size >= 350) {
        return (value, index) => (value > 999 ? `${value / 1000} kHz` : `${value} Hz`);
    }

    return (value, index) => (value > 999 ? `${value / 1000}k` : value.toString());
}

export default frequencyTickFormatFunction;
