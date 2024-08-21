import * as z from 'zod';

const signupSchema = z.object({
  email: z.string().email({ message: "Valid email is required" }),
  firstname: z.string().min(1, { message: "This field cannot be empty." }),
  lastname: z.string().min(1, { message: "This field cannot be empty." }),
  username: z.string().min(1, { message: "This username is taken. Please try again." }),
  password: z.string()
    .min(8, "Be at least 8 characters.")
    .regex(new RegExp(".*[a-z].*"), "Have at least one lower case character.")
    .regex(new RegExp(".*[A-Z].*"), "Have at least one capital letter.")
    .regex(new RegExp(".*\\d.*"), "Have at least one number.")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "At least one special character."
    ),
  confirmpassword: z.string(),
  phonenumber: z.string().regex(/^\+?[0-9]{7,15}$/, "Invalid phone number."),
  referralcode: z.string().optional(),

    
  newsletter: z.boolean(),
  terms: z.boolean(),
}).refine(data => data.password === data.confirmpassword, {
  message: "This must match the above password.",
  path: ["confirmpassword"], // path of error
}).refine(data => data.terms, {
  message: "You must accept the terms and conditions.",
  path: ["terms"], // path of error
});

export type SignupSchema = z.infer<typeof signupSchema>;

export default signupSchema;
