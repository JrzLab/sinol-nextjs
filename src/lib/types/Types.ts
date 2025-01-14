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
  date: Date;
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
  data: 0;
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
  name: string;
  imageUrl: string;
}

export interface IGroupClass {
  uid: string;
  day: number;
  className: string;
  description: string;
  ownerData: IGroupClassOwner;
}

export interface IClassResponse {
  code: number;
  success: boolean;
  message: string;
  data: {
    groupClass: IGroupClass[];
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

export interface ChatHistoryResponse {
  code: number;
  status: boolean;
  message: string;
  data: ChatHistoryData;
}

export interface ChatHistoryData {
  id: number;
  createdAt: string; // ISO date string
  expiredAt: string; // ISO date string
  userAId: number;
  userBId: number;
  messages: ChatMessage[];
}

export interface ChatMessage {
  uid: string; // UUID
  roomChatId: number;
  senderId: number;
  sender: ChatSender;
  content: string;
  messageTemp: string; // ISO date string
}

interface ChatSender {
  email: string;
  firstName: string;
}

export interface IMsgWS {
  identifySender: string;
  identifyReciver: string;
  message: string;
  idRoom: string;
}

export interface IResponseJoinClass {
  code: number;
  success: boolean;
  message: string;
  data: {
    uid: string;
    day: number;
    className: string;
    description: string;
    ownerData: {
      email: string;
      name: string;
      imageUrl: string;
    };
  };
}

export interface IEvent {
  id: number;
  title: string;
  description: string;
  dueDateAt: string; // Format date dalam string ISO
  maxScore: number;
}

export interface IResponseEvent {
  code: number;
  success: boolean;
  message: string;
  data: IEvent[];
}

export interface IRequestCreateEvent {
  uid: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
}

export interface IResponseCreateEvent {
  code: number;
  success: boolean;
  message: string;
  data: IEvent;
}

export interface IUserDataProps {
  id: number;
  email: string;
  firstName: string;
  lastName: string | null;
  imageUrl: string | null;
}

export interface IUserProps {
  code: number;
  success: boolean;
  message: string;
  data: IUserDataProps;
}


interface IEventDataProps {
  id: number;
  title: string;
  url: string;
}

export interface IClassNavbarData {
  classUid: string;
  title: string;
  events: IEventDataProps[];
}
