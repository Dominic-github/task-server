export default interface IToken {
  _id: string
  user_id: string
  public_key: string
  private_key: string
  refresh_token: string
  refresh_token_used: string[]
}
