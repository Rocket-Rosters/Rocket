// this component is used to display the account information of the user from the database profile table
// the user can update their profile information and avatar
// it will be displayed on the /account page
// make all import statements
import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../utils/database.types'
import { useUser } from '../utils/useUser'
import { postData } from '../utils/helpers'
import { Avatar } from './Avatar'
import { LoadingDots } from './ui/LoadingDots'
import { Button } from './ui/Button'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

type Profiles = Database['public']['Tables']['profiles']['Row']



export default function Account() {
    // make all state variables
    const [session, loading] = useSession()
    const router = useRouter()
    const supabase = useSupabaseClient<Database>()
    const { isLoading, subscription, userDetails } = useUser()
    const [name, setName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState<Profiles['avatar_url']>(null)
    const [uploading, setUploading] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')

    // make all useEffect hooks
    useEffect(() => {
        if (!session) {
            router.push('/signin')
        }
    }
    , [session])

    // make all functions
    const updateProfile = async () => {
        // make sure the user is logged in
        if (!session) {
            return
        }
    // make sure the user has a profile
        if (!userDetails) {
            return
        }
        // make sure the user has a profile
        if (!userDetails) {
            return
        }
    // 
