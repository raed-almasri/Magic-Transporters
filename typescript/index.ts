export interface FileItem {
    mimetype: string;
    filename: string;
    path: string;
    size: number;
    originalname: string;
}
export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    verification_email: string;
    picture?: string; // Marked as optional with ?
    role: string;
}

export interface ITrip {
    id: number;
    name: string;
    quest_state: string;
    magic_mover_id: number;
}

export interface ITripWithMagicMover {
    id: number;
    name: string;
    quest_state: string;
    magic_mover_id: number;
    magic_mover_info: {
        id: number;
        weight: number;
        energy: number;
    };
}

export interface IMagicMover {
    id: number;
    weight: number;
    energy: number;
    createdAt: Date;
}
export interface IMagicMoverWithProfile {
    id: number;
    weight: number;
    energy: number;
    createdAt: Date;
    profile_info: {
        id: number;
        name: string;
        email: string;
        picture: string;
    };
}
