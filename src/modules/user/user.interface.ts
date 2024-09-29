
export type TUser = {
    name : string;
    email: string;
    role : 'user'|'admin',
    password? : string;
    image : string;
    isBlocked? : boolean;
}
