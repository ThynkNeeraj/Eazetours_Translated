import { EmailTemplate } from "../../../components/ContactUsEmailTemplate";
import { Resend } from "resend";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

const resend = new Resend(process.env.RESEND_API_KEY);
const enquiry_email =
  process.env.ENQUIRY_EMAIL == null ? "utsavan@gmail.com" : process.env.ENQUIRY_EMAIL;

export async function POST(request: Request) {
  try {
    const request_data: {
      ["name"]: string;
      ["email"]: string;
      ["subject"]: string;
      ["message"]: string;
    } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Website <site@eazetours.com>",
      to: ["info@eazetours.com", enquiry_email],
      subject: "New Enquiry - " + request_data.subject,
      react: EmailTemplate({
        name: request_data.name,
        email: request_data.email,
        subject: request_data.subject,
        message: request_data.message,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
