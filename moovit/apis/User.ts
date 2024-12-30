import { User } from "@/types/User";
export const registerUser = async (user: any): Promise<any> => {
  try {
    console.log("User" + user.name);
    const response = await fetch("https://moovit-be.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log("Response");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to register user");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const loginUser = async (user: any): Promise<any> => {
    try {
      console.log("User" + user.name);
      const response = await fetch("https://moovit-be.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      console.log("Response");
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error("Failed to register user");
    } catch (error: any) {
      console.error(error.message);
    }
  };

export const testBackend = async (): Promise<any> => {
  try {
    const response = await fetch("https://moovit-be.onrender.com/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(response);
      return data;
    }
    throw new Error("Failed to test backend");
  } catch (error: any) {
    console.error(error.message);
  }
};
