import { Ear, IResponseShape, Modality, Response } from './Response';

class ResponseCollection {
    public static from(responses: IResponseShape[]): ResponseCollection {
        return new ResponseCollection(responses.map(response => new Response(response)));
    }

    public responses: Response[];

    constructor(responses: Response[]) {
        this.responses = responses;
    }

    public partition(): ResponseCollection[] {
        return [
            this.right().air(),
            this.left().air(),
            this.right().bone(),
            this.left().bone(),
            this.soundfield(),
            this.aided(),
            this.implant(),
        ].filter(set => set.length);
    }

    public next(index: number): Response {
        return this.responses[index + 1];
    }

    public needsLineToNextMarker(index: number): boolean {
        const nextResponse = this.next(index);

        return nextResponse !== undefined && nextResponse.modality !== 'bone' && nextResponse.noResponse === false;
    }

    public filterByEar(ear: Ear): ResponseCollection {
        return new ResponseCollection(this.responses.filter(response => response.ear === ear));
    }

    public filterByModality(modality: Modality): ResponseCollection {
        return new ResponseCollection(this.responses.filter(response => response.modality === modality));
    }

    public forEach(fn: (response: Response) => void) {
        this.responses.forEach(fn);
    }

    public get length(): number {
        return this.responses.length;
    }

    public get ear(): Ear {
        const ear: Ear[] = this.responses.reduce((ears: Ear[], response: Response): Ear[] => {
            if (ears.indexOf(response.ear) === -1) {
                ears.push(response.ear);
            }

            return ears;
        }, []);

        if (ear.length !== 1) {
            throw Error(UNPARTITIONED_ERROR);
        }

        return ear[0];
    }

    public get modality(): Modality {
        const modality: Modality[] = this.responses.reduce((modalities: Modality[], response: Response): Modality[] => {
            if (modalities.indexOf(response.modality) === -1) {
                modalities.push(response.modality);
            }

            return modalities;
        }, []);

        if (modality.length !== 1) {
            throw Error(UNPARTITIONED_ERROR);
        }

        return modality[0];
    }

    public toArray(): Response[] {
        return this.responses;
    }

    public right(): ResponseCollection {
        return this.filterByEar(Ear.right);
    }

    public left(): ResponseCollection {
        return this.filterByEar(Ear.left);
    }

    public both(): ResponseCollection {
        return this.filterByEar(Ear.both);
    }

    public air(): ResponseCollection {
        return this.filterByModality(Modality.Air);
    }

    public bone(): ResponseCollection {
        return this.filterByModality(Modality.Bone);
    }

    public soundfield(): ResponseCollection {
        return this.filterByModality(Modality.Soundfield);
    }

    public aided(): ResponseCollection {
        return this.filterByModality(Modality.HearingAid);
    }

    public implant(): ResponseCollection {
        return this.filterByModality(Modality.CochlearImplant);
    }
}

const UNPARTITIONED_ERROR =
    'Collection must be partitioned before determining ear or modality.  See ResponseCollection.partition()';

export { ResponseCollection };
