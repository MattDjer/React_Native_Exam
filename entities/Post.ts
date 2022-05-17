export class Post {
    constructor(
        public title: string, 
        public description: string,
        public timestamp: Date, 
        public userId: string, 
        public userMail: string, 
        public comments: Comment[] = [],
        public numberOfLikes: number,
        public userLikes: any,
        public id: string,
        public displayName?: string,        
        ){}
}