export interface IUserData {
  data: {
    accessToken: string;
    user: {
      email: string;
      displayName: string;
      lastStage: number;
    };
  };
}
