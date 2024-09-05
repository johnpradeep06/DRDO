import { castes, genders, statesOfIndia, validIDTypes } from "@/constants/registration";
import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string(),
  gender: z.enum(genders),
  caste: z.enum(castes),
  dob: z.string().date(),
  presentAge: z.number(),
  mobileNumber: z.number(),
  emailAddress: z.string().email(),
  idProof: z.object({
    validIdType: z.enum(validIDTypes),
    value: z.string()
  })
})

export const passwordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string()
})

export const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.enum(statesOfIndia),
  pinCode: z.number()
})

export const educationSchema = z.object({
  classOrDegree: z.string(),
  boardOrUniversity: z.string(),
  yearOfPassing: z.number(),
  subjects: z.array(z.string()),
  marksPercentage: z.number()
})

export const experienceSchema = z.object({
  postHeld: z.string(),
  employerName: z.string(),
  periodOfWork: z.object({
    from: z.date(),
    to: z.date()
  }),
  natureOfWork: z.string(),
  salary: z.number(),
  remarks: z.string()
})


export const registrationFormSchema = z.object({
  profile: profileSchema,
  address: z.object({
    addressForCorrespondence: addressSchema,
    permanentAddress: addressSchema
  }),
  education: z.array(educationSchema),
  experienceSchema: z.array(experienceSchema),
  password: passwordSchema,
  declaration: z.boolean()
})

export type RegistrationFormType = z.infer<typeof registrationFormSchema>;