export const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/";

const serverAPI = {
    BLOGS: "blogs",
    AUTH_LOGIN: "auth/login"

};
export const ApiConstants = {
    ...serverAPI,
};
