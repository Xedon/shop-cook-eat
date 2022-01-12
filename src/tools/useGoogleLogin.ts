import { useDispatch } from "react-redux";
import { googleLoginFailed } from "../state/store";

export const googleLogin = (loginFailedCB: (promt: any) => void) => {
  (window as any).google.accounts.id.prompt((promt: any) => {
    loginFailedCB(promt);
  });
};

export const useGoogleLogin = () => {
  const dispatch = useDispatch();
  return {
    login: () =>
      googleLogin((promt: any) => {
        if (promt.isSkippedMoment() || promt.isNotDisplayed()) {
          dispatch(googleLoginFailed());
        }
      }),
  };
};
