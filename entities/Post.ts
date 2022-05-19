export class Post {
    constructor(
        public title: string, 
        public description: string,
        public timestamp: string, 
        public userId: string, 
        public userMail: string, 
        public comments: Comment[] = [],
        public numberOfLikes: number,
        public userLikes: any,
        public id: string,
        public photoUrl: string, 
        public displayName?: string,       
        ){}
}