export interface Role {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface RolesResponse {
    message: string;
    status: number;
    data: Role[];
}