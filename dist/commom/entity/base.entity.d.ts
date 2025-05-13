export declare class BaseEntity {
    createdAt: Date;
    createdBy: string;
    isDeleted: boolean;
    deletedAt?: Date | null;
    deletedBy?: string | null;
    updatedAt?: Date | null;
    updatedBy?: string | null;
}
