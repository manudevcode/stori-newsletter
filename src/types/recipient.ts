export type Recipient = {
  _id: string;
  email: string;
  recipientsList: string[] | UserRecipientList;
};

export type UserRecipientList = { _id: string; name: string }[];

export type RecipientList = {
  _id: string;
  name: string;
  description: string;
  initialSubscribers: number;
  currentSubscribers: number;
};
