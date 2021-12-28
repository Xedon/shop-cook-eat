import React, { FunctionComponent, useEffect, useState } from "react";

const googleUrl = "https://accounts.google.com/gsi/client";

export interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleButtonParams {
  onCredentialResponse: (response: GoogleCredentialResponse) => void;
}

const GoogleButton: FunctionComponent<GoogleButtonParams> = ({
  onCredentialResponse,
}) => {
  const [scriptLoaded, setScriptLoaded] = useState(
    typeof window !== "undefined" &&
      typeof (window as any).google !== "undefined"
  );
  const divRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (scriptLoaded && divRef.current) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: onCredentialResponse,
      });
      (window as any).google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
        width: divRef.current.clientWidth,
      });
    }
  }, [scriptLoaded, divRef, onCredentialResponse]);

  return (
    <>
      <script
        src={googleUrl}
        onLoad={() => setScriptLoaded(true)}
        async
        defer
      />

      <div ref={divRef} />
    </>
  );
};

export default GoogleButton;
