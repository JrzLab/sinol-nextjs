export interface ISubject {
  id: number;
  title: string;
  teacher: string;
  description: string;
  notifications: number;
  event: number;
  person: number;
  day: number;
}

export interface IEvent {
  subjectId: number; // Foreign key yang merujuk ke Subject.id
  eventId: number; // Primary key
  title: string;
  date: string; // Format date dalam string ISO
  description: string;
}

export interface IMessage {
  content: string;
  userType: "student" | "teacher";
  time: string;
}

export interface IStudent {
  id: number;
  name: string;
  email: string;
  kelas: string;
  messages: IMessage[];
}

export interface IConversation {
  id: number;
  name: string;
  email: string;
  kelas: string;
  messages: string;
  lastMessageTime: string;
}

export interface ISignInResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    firstName: string;
    lastName: string | null;
    email: string;
    imageUrl: string | null;
    joinedAt: string;
    loginAt: number;
  };
}

export interface IRequestResetPass {
  success: boolean;
  code: number;
  message: string;
  data: {
      access_token?: string;
  };
}

export interface IResetPassword {
  success: boolean;
  code: number;
  message: string;
  data: {};
}

export interface ISignUpResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
      firstName: string;
      email: string;
      joinedAt: string
  }
}