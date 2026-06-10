import { JWTUserType } from "@/types/UserType";

export const createJWT = async (payload: JWTUserType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
  }
};

export const removeJWT = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/auth/logout`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
  }
};
