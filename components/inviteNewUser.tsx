import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { NextPage } from 'next'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

//@ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey)

type FormValues = {
  email: string
}

const InviteUser: NextPage = () => {
  const [formValues, setFormValues] = useState<FormValues>({ email: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      //@ts-ignore
      const { error } = await supabase.auth.inviteUser(formValues.email)
      if (error) {
        throw new Error(error.message)
      }
      setSuccess(true)
    } catch (error: any) {

      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Invite User</h1>
      {success ? (
        <p>Invitation sent!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              value={formValues.email}
              onChange={(event) =>
                setFormValues({ ...formValues, email: event.target.value })
              }
              required
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Invitation'}
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  )
}

export default InviteUser