import nodemailer from 'nodemailer'
import crypto from 'crypto'

//Temporary in-memory storage for OTPs
global.otpStorage = {};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(SMTP_PORT),
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_FROM,
  },
});

// Generate a random 6-digit OTP
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

export const sendOTP = async (email) => {
  const otp = generateOTP();
  const expiryTime = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

  global.otpStorage[email] = { otp, expiry: expiryTime };

  const mailOptions = {
    from: `"WorkLync" <${process.env.SMTP_FROM}>`, // Sender's email
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It is valid for 15 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully.' };
  } catch (error) {
    console.log('Error sending OTP:', error);
    return { success: false, message: 'Failed to send OTP.' };
  }
};

export const verifyOTP = (email, userInputOtp) => {
  const storedData = global.otpStorage?.[email];

  if (!storedData) {
    return { success: false, message: 'No OTP found for this email.' };
  }

  const { otp, expiry } = storedData;

  // Check if OTP has expired
  if (Date.now() > expiry) {
    delete global.otpStorage[email]; // Cleanup
    return { success: false, message: 'OTP has expired.' };
  }

  // Validate OTP
  if (otp === String(userInputOtp)) {
    delete global.otpStorage[email]; // Clear after successful verification
    return { success: true, message: 'OTP verified successfully.' };
  }

  return { success: false, message: 'Invalid OTP.' };
};

export const sendOnboardingEmailforAgency = async (email, password) => {
  const mailOptions = {
    from: `"WorkLync" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Welcome to WorkLync - Job candidate Onboarding',
    text: `
Welcome to WorkLync!

You have been successfully onboarded as a job candidate.

Login credentials:
Email: ${email}
Password: ${password}

Please log in to your candidate dashboard to complete your profile:
${process.env.SIGNIN_URL}

For support or questions, feel free to contact us.

Best regards,
The WorkLync Team
    `.trim()
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Onboarding email sent to candidate.' };
  } catch (error) {
    console.log('Error sending onboarding email to candidate:', error);
    return { success: false, message: 'Failed to send onboarding email to candidate.' };
  }
};

// export const sendOnboardingEmailForCustomer = async (email, password, code) => {
//   const mailOptions = {
//     from: `"WorkLync" <${config.SMTP.from}>`,
//     to: email,
//     subject: 'Welcome to WorkLync - Customer Onboarding',
//     text: `
// Welcome to WorkLync!

// Your account has been created.

// Login credentials:
// Email: ${email}
// Password: ${password}

// To activate your account, please use the following code:
// Activation Code: ${code}

// Visit the activation page to complete the setup:
// ${config.CUSTOMER_LOGIN_URL}

// If you have any questions, our support team is here to help.

// Warm regards,
// The WorkLync Team
//     `.trim()
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return { success: true, message: 'Onboarding email sent to customer.' };
//   } catch (error) {
//     console.log('Error sending onboarding email to customer:', error);
//     return { success: false, message: 'Failed to send onboarding email to customer.' };
//   }
// };
