interface EmailTemplateProps {
  name: string;
  confirmUrl: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  confirmUrl,
}) => (
  <div>
    <h1>Welcome, {name}</h1>

    <p>
      Please confirm your email address by clicking on the button below. This
      helps us to protect against spam.
    </p>
    <a href={confirmUrl}>Click here</a>
  </div>
);
