class EmailService {
  constructor(
    private email: string,
    private name: string,
    private type: string
  ) {
    this.email = email
    this.name = name
    this.type = type
  }
  async sendEmailToken(to: string, subject: string, body: string) {
    console.log(
      `Sending email to ${to} with subject "${subject}" and body "${body}"`
    )
  }
}

export default EmailService
