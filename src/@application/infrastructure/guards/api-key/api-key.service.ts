export class ApiKeyService {
  private allowedKeys: string[] = [process.env.API_KEY ?? ''];

  async isKeyValid(apiKey: string): Promise<boolean> {
    return this.allowedKeys.indexOf(apiKey) > -1;
  }
}
