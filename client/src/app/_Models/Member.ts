import { Photo } from "./photo";

    export interface Member {
        id: number;
        userName: string;
        photoUrl: string;
        age: number;
        knownAs: string;
        created: Date;
        lastActive: Date;
        gender: string;
        introduction: string;
        lookingFor: string;
        intrestes: string;
        city: string;
        country: string;
        photoId: number;
        photos: Photo[];
    }

    




