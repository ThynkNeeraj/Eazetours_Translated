import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div>
    <h2>New Enquiry recieved.</h2>
    <div>Name: {name}</div>
    <div>Email: {email}</div>
    <div>Subject: {subject}</div>
    <div>Message: {message}</div>
  </div>
);
