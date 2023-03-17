export class GoogleAuthClient {
  private callbacks: Array<({ token }: { token: string }) => void> = [];

  constructor() {
    (window as any).google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: (resp: any) => this.callback(resp),
      auto_select: true,
    });
  }

  private callback(resp: any) {
    for (
      let nextCallback = this.callbacks.pop();
      nextCallback !== undefined;
      nextCallback = this.callbacks.pop()
    ) {
      nextCallback({ token: resp.credential });
    }
  }

  public promt(): Promise<{ token: string }> {
    return new Promise((resolve, reject) => {
      this.callbacks = [...this.callbacks, resolve];
      (window as any).google.accounts.id.prompt((promt: any) => {
        if (promt.isSkippedMoment() || promt.isNotDisplayed()) {
          reject(promt.getNotDisplayedReason() ?? promt.getSkippedReason());
        }
      });
    });
  }
}
