
export interface UpdateUserDto {
    id:       string;
    nickname: string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    password?:string
}