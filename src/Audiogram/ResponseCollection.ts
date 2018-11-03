import { Ear, IResponseShape, Modality, Response } from './Response';

class ResponseCollection {
    public static from(responses: Array<IResponseShape>): ResponseCollection {
        return new ResponseCollection(responses.map(response => new Response(response)));
    }

    public responses: Array<Response>;

    constructor(responses: Array<Response>) {
        this.responses = responses;
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
            throw Error(
                'Collection contains more than one ear listing and should be partitioned first.  See ResponseCollection.partition()',
            );
        }

        return ear[0];
    }

    public toArray(): Array<Response> {
        return this.responses;
    }
}

export { ResponseCollection };
