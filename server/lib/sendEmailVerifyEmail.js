import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.VERIFY_EMAIL_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "E-Commerce App | Verify Email | MERN Series <website@resend.dev>",
      to: [to],
      subject,
      html,
    });

    if (error) {
      return console.error("Error", error);
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("Try Catch Error", error);
  }
};
