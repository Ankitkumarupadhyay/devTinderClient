export const BASE_URL: string =
  process.env.NODE_ENV === "production"
    ? "https://dev-tinder-backend-bice.vercel.app"
    : "http://localhost:7777";
