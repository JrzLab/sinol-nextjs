export interface ISubject {
  id: number;
  email?: string;
  title: string;
  teacher: string;
  description: string;
  notifications: number;
  event: number;
  person: number;
  day: number;
  status: "active" | "idle";
  date: Date;
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
  userType: "sender" | "receiver";
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

export interface ISignInGoogleResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
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

export interface IUserData {
    username?: string;
    email?: string;
    imageUrl?: string;
    joinedAt?: string;
    loginAt?: number;
    existClassroom?: boolean;
}

export interface IAuthContextProps {
    isAuthenticated: boolean;
    isUnauthenticated: boolean;
    user: IUserData | null;
    status: "authenticated" | "loading" | "unauthenticated";
    loading: boolean;
}

export interface IGroupClassOwner {
  email: string;
}

export interface IGroupClass {
  id: number;
  className: string;
  description: string;
  owner: IGroupClassOwner;
}

export interface IClassResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    uid: string;
    userId: number;
    createdAt: string;
    groupClass: IGroupClass[];
  };
}
