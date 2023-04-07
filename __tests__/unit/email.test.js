const nodemailer = require("nodemailer");
const { Email, ForgotPasswordEmail } = require("../../src/utils/Email");

jest.mock("nodemailer", () => ({
  createTestAccount: jest.fn().mockResolvedValue({
    user: "testuser",
    pass: "testpass",
  }),
  createTransport: jest.fn(),
}));

describe("Email Utils", () => {
  let email;

  beforeEach(() => {
    email = new Email();
  });

  it("should create a new Email instance with correct properties", () => {
    expect(email.messageInfo).toEqual({
      from: '"Fred Foo 👻" <foo@example.com>',
      to: "bar@example.com, baz@example.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
  });

  it("should create a new instance with the correct message info", () => {
    const email = new ForgotPasswordEmail("foo@example.com", "123456");
    expect(email.messageInfo.from).toEqual(
      '"Template Sequelize" <foo@example.com>'
    );
    expect(email.messageInfo.to).toEqual("foo@example.com");
    expect(email.messageInfo.subject).toEqual("Recuperação de senha");
    expect(email.messageInfo.text).toEqual(
      "Segue o link para recuperação de senha: 123456"
    );
    expect(email.messageInfo.html).toEqual(
      "<p>Segue o link para recuperação de senha: 123456</p>"
    );
  });
});
