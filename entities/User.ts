export class User {
    email: string;
    displayName?: string;
    photoUrl?: string

    constructor(email: string, displayname?: string, photoUrl?: string) {
        this.email = email;
        this.displayName = displayname;
        this.photoUrl = photoUrl;
    }
}