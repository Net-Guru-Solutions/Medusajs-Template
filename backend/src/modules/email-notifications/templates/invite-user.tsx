import { Button, Link, Section, Text, Img, Hr } from '@react-email/components'
import { Base } from './base'

/**
 * The key for the InviteUserEmail template, used to identify it
 */
export const INVITE_USER = 'invite-user'

/**
 * The props for the InviteUserEmail template
 */
export interface InviteUserEmailProps {
  /**
   * The link that the user can click to accept the invitation
   */
  inviteLink: string
  /**
   * The preview text for the email, appears next to the subject
   * in mail providers like Gmail
   */
  preview?: string
}

/**
 * Type guard for checking if the data is of type InviteUserEmailProps
 * @param data - The data to check
 */
export const isInviteUserData = (data: any): data is InviteUserEmailProps =>
  typeof data.inviteLink === 'string' && (typeof data.preview === 'string' || !data.preview)

/**
 * The InviteUserEmail template component built with react-email
 */
export const InviteUserEmail = ({
  inviteLink,
  preview = `You've been invited to Medusa!`,
}: InviteUserEmailProps) => {
  return (
    <Base preview={preview}>
      <Section className="mt-[32px] mb-[32px]">
        <Img
          src="https://placeholder.svg?height=80&width=300"
          alt="Frontline Military"
          className="mx-auto h-20"
        />
      </Section>
      <Section className="text-center">
        <Text className="text-gray-800 text-[18px] leading-[28px] font-semibold">
          You've been invited to join Frontline Military as an administrator.
        </Text>
        <Section className="mt-6 mb-[32px]">
          <Button
            className="bg-blue-600 rounded text-white text-[14px] font-semibold no-underline px-6 py-3 hover:bg-blue-700 transition-colors"
            href={inviteLink}
          >
            Accept Invitation
          </Button>
        </Section>
        <Text className="text-gray-600 text-[14px] leading-[24px]">
          Or copy and paste this URL into your browser:
        </Text>
        <Text style={{
          maxWidth: '100%',
          wordBreak: 'break-all',
          overflowWrap: 'break-word'
        }}>
          <Link
            href={inviteLink}
            className="text-blue-600 no-underline hover:underline"
          >
            {inviteLink}
          </Link>
        </Text>
      </Section>
      <Hr className="border border-solid border-gray-300 my-[26px] mx-0 w-full" />
      <Text className="text-gray-600 text-[12px] leading-[20px]">
        If you were not expecting this invitation, you can ignore this email, as the
        invitation will expire in 24 hours. If you are concerned about your account's safety
        or have any questions, please contact Net Guru Solutions at{' '}
        <Link href="mailto:info@netgurusolutions.co.uk" className="text-blue-600 no-underline hover:underline">
          info@netgurusolutions.co.uk
        </Link>.
      </Text>
    </Base>
  )
}

InviteUserEmail.PreviewProps = {
  inviteLink: 'https://mywebsite.com/app/invite?token=abc123ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd'
} as InviteUserEmailProps

export default InviteUserEmail
