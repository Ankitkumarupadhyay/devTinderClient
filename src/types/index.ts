export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  emailId: string;
  age?: number;
  gender?: "Male" | "Female" | "Other";
  photoUrl: string;
  about?: string;
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ConnectionRequest {
  _id: string;
  fromUserId: User;
  toUserId: User;
  status: "ignored" | "interested" | "accepted" | "rejected";
  createdAt?: string;
  updatedAt?: string;
}
