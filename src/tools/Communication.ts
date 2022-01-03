export const createAuthChannel = () => ({
  type: "auth",
  channel: new BroadcastChannel("auth"),
});

export enum AuthMessageTypes {
  AuthRequest = "AuthRequest",
  AuthResponse = "AuthResponse",
}

type AuthChannel = ReturnType<typeof createAuthChannel>;
type Callback<Resp> = (resp: Resp) => void;

export const postAuthRequest = (channel: AuthChannel) => {
  channel.channel.postMessage({ type: AuthMessageTypes.AuthRequest });
};

export const postAuthResponse = (channel: AuthChannel, idToken: string) => {
  channel.channel.postMessage({ type: AuthMessageTypes.AuthRequest, idToken });
};

export const registerListenerForAuthMessageType = <
  Resp extends AuthBaseRequest
>(
  channel: AuthChannel,
  messageType: Resp["type"],
  cb: Callback<Resp>
) => {
  channel.channel.onmessage = (event) => {
    const data: Resp = event.data;
    if (data.type === messageType) {
      return cb(data);
    }
  };
};

interface AuthBaseRequest {
  type: AuthMessageTypes;
}

export interface AuthRequest extends AuthBaseRequest {
  type: AuthMessageTypes.AuthRequest;
}

export interface AuthResponse extends AuthBaseRequest {
  type: AuthMessageTypes.AuthResponse;
  idToken: string;
}
