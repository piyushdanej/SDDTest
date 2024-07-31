export const users : LoginUser[] = [
    {
        username: "admin1",
        password: "admin1",
        role: "SOP1admin"
    },
    {
        username: "admin2",
        password: "admin2",
        role: "SOP2admin"
    }
]


export interface LoginUser {
    username: string,
    password: string,
    role: string
}