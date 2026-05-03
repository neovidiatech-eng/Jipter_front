export interface UserBasicInfo {
    name: string;
    email: string;
}

export interface StudentInAssignment {
    id: string;
    user_id: string;
    birth_date: string;
    gender: string;
    active: boolean;
    planId: string;
    country: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    sessions: number;
    sessions_attended: number;
    sessions_remaining: number;
    user: UserBasicInfo;
}

export interface TeacherInAssignment {
    id: string;
    user_id: string;
    currencyId: string;
    hour_price: number;
    gender: string;
    active: boolean;
    roleId: string | null;
    createdAt: string;
    updatedAt: string;
    user: UserBasicInfo;
}

export interface SubjectInAssignment {
    id: string;
    name_en: string;
    name_ar: string;
    active: boolean;
    color: string;
    createdAt: string;
    updatedAt: string;
}

export interface Assignment {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'completed' | 'graded' | string;
    dueDate: string;
    studentId: string;
    teacherId: string;
    subjectId: string;
    createdAt: string;
    updatedAt: string;
    student: StudentInAssignment;
    teacher: TeacherInAssignment;
    subject: SubjectInAssignment;
}

export interface AssignmentsResponse {
    message: string;
    status: number;
    data: Assignment[];
}
