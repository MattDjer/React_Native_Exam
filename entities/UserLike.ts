export class UserLike {
    email: string;
    displayName?: string;

    constructor(email: string, displayname?: string) {
        this.email = email;
        this.displayName = displayname;
    }
}