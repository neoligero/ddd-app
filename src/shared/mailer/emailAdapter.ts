import { injectable } from "inversify";

@injectable()
export class EmailAdapter {

  public async notify(msg: string): Promise<void> {
    return await this.sendMail(msg);
  }

  private async sendMail(msg: string) {
    return Promise.resolve();
  }
}

export default EmailAdapter;