import { IResponseShape, Response } from './Response';

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
}

export { ResponseCollection };
