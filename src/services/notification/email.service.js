import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS,
    },
  });

export const sendTaskEmail =
  async ({
    to,
    assignee,
    task,
    deadline,
  }) => {
    try {
      // Verify SMTP connection
      await transporter.verify();

      console.log(
        "SMTP server ready"
      );

      const info =
        await transporter.sendMail({
          from: process.env.EMAIL_USER,

          to,

          subject:
            "New Task Assigned",

          html: `
            <h2>Hello ${assignee},</h2>

            <p>You have been assigned a new task.</p>

            <h3>Task:</h3>
            <p>${task}</p>

            <h3>Deadline:</h3>
            <p>${
              deadline ||
              "Not specified"
            }</p>

            <br/>

            <p>Regards,</p>
            <p>TaskMan AI</p>
          `,
        });

      console.log(
        "Email sent:",
        info.response
      );

      return info;
    } catch (error) {
      console.error(
        "Email sending error:",
        error
      );

      throw error;
    }
  };