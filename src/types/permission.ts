export interface Permission {
    id: string;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
}

export interface PermissionResponse {
    message: string;
    status: number;
    data: Permission[];
}

export interface CreatePermissionPayload {
    name: string;
    code: string;
}
