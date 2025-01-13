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
    uid: string;
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
    uid: string;
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
    joinedAt: string;
  };
}

export interface IUserData {
  uidClassUser?: string;
  username?: string;
  email?: string;
  imageUrl?: string;
  joinedAt?: Date;
  loginAt?: number;
  expiresAt?: Date;
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
  uid: string;
  day: number;
  className: string;
  description: string;
  ownerData: {
    email: string;
    name: string;
    imageUrl: string;
  };
}

export interface IClassResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    uid: string;
    day: string;
    className: string;
    description: string;
    ownerData: {
      email: string;
      name: string;
      imageUrl: string;
    };
  };
}

export interface IResponseChangeData {
  code: number;
  success: boolean;
  message: string;
  data: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    imageUrl: string;
  };
}

export interface IResponseChangeProfile {
  code: number;
  success: boolean;
  message: string;
  data: {
    linkProfile: string;
  };
}

export interface IAccountInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (firstName: string, lastName: string, email: string, password: string) => void;
  currentFirstName?: string;
  currentLastName?: string;
  currentEmail?: string;
  loading: boolean;
}
