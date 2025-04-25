'use server'

import { fetchGraphQL } from "../fetch-graphql";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { SignUpFormState } from "../types/form-state";
import { SignupFormSchema } from "../zodSchema/signup-form.schema";
import { print } from 'graphql'
import { redirect } from 'next/navigation';
import { LoginFormSchema } from "../zodSchema/login-form.schema";
import { revalidatePath } from "next/cache";
import { setUserCookie } from "../auth-cookie";

export async function signUp(state: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const validatedFields = SignupFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
    input: { ...validatedFields.data }
  })

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: 'Something went wrong.'
    }
  }
  
  redirect('/auth/signin')
}

export async function signIn(state: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const validatedFields = LoginFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) return {
    data: Object.fromEntries(formData.entries()),
    errors: validatedFields.error.flatten().fieldErrors,
  }

  const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
    input: { ...validatedFields.data }
  })

  if (data.errors) return {
    data: Object.fromEntries(formData.entries()),
    message: 'Invalid email or password.'
  }

  await setUserCookie({
    user: {
      id: data.signIn.id,
      name: data.signIn.name,
      avatar: data.signIn.avatar,
    },
    accessToken: data.signIn.accessToken
  })

  revalidatePath('/')
  redirect('/')
}
