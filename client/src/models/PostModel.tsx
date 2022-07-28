export interface Post {
    id: number;
    user_id: string;
    content: string;
    profile_url: string;
    fullname: string;
    parentId: number;
}