
export interface User {
    _id: string 
    user_id: string
    email: string
    profile_url: string 
    first_name: string 
    last_name: string 
    job: string 
    education: string
    location: string 
    friends: [User]
}