class Response {
    public amplitude: number;
    public frequency: number;
    public ear: Ear;
    public masking: null | number;
    public modality: Modality;
    public noResponse: boolean;
    public stimulus: Stimulus;
    public test: Test;

    constructor({
        amplitude,
        frequency,
        ear,
        masking = null,
        modality = Modality.Air,
        no_response = false,
        stimulus = Stimulus.Tone,
        test = Test.Threshold,
    }: IResponseShape) {
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.ear = ear;
        this.masking = masking;
        this.modality = modality;
        this.noResponse = no_response;
        this.stimulus = stimulus;
        this.test = test;
    }

    public isBoneConduction(): boolean {
        return this.modality === Modality.Bone;
    }

    public masked(): boolean {
        return this.masking === null;
    }

    public type(): string {
        return [this.ear, this.modality, this.masked() ? 'unmasked' : 'masked'].join('.');
    }

    public key(): string {
        return [this.type(), this.frequency.toString()].join('.');
    }
}

export enum Ear {
    Right = 'right',
    Left = 'left',
    Both = 'both',
    HearingAid = 'hearing aid',
    CochlearImplant = 'cochlear implant',
}

export enum Modality {
    Air = 'air',
    Bone = 'bone',
    Soundfield = 'soundfield',
}

export enum Stimulus {
    Tone = 'tone',
    Pulse = 'pulse',
    FM = 'fm',
    Narrowband = 'narrowband noise',
    White = 'white noise',
    Pink = 'pink noise',
    Speech = 'speech',
    SpeechInNoise = 'speech in noise',
    SpeechNoise = 'speech-shaped noise',
}

export enum Test {
    Threshold = 'threshold',
    Discrimination = 'discrimination',
}

export interface IResponseShape {
    amplitude: number;
    frequency: number;
    ear: Ear;
    masking?: null | number;
    modality?: Modality;
    no_response?: boolean;
    stimulus?: Stimulus;
    test?: Test;
}

export { Response };
