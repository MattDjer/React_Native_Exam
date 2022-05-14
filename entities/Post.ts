export class Post {
    constructor(
        public id: string,
        public title: string, 
        public description: string,
        public timestamp: Date, 
        public userId: string, 
        public userMail: string, 
        public comments: Comment[],
        public displayName?: string,       
        ){}
}