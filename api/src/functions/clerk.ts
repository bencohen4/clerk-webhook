import { VerifyOptions, verifyEvent } from '@redwoodjs/api/webhooks'

export const handler = async (event: any) => {
  try {
    const options: VerifyOptions = {
      signatureHeader: 'svix-signature',
      signatureTransformer: (signature: string) => {
        // Clerk can pass a space separated list of signatures.
        // Let's just use the first one that's of version 1
        const passedSignatures = signature.split(' ')

        for (const versionedSignature of passedSignatures) {
          const [version, signature] = versionedSignature.split(',')

          if (version === 'v1') {
            return signature
          }
        }
      },
    }

    const svix_id = event.headers['svix-id']
    const svix_timestamp = event.headers['svix-timestamp']

    const payload = `${svix_id}.${svix_timestamp}.${event.body}`

    verifyEvent('base64Sha256Verifier', {
      event,
      secret: process.env.CLERK_WH_SECRET.slice(6),
      payload,
      options,
    })

    const parsedPayload = JSON.parse(event.body)

    const data = parsedPayload?.data

    // Safely use the validated webhook payload
    const firstName = data?.first_name
    const lastName = data?.last_name
    const emailAddress = data?.email_addresses?.[0]?.email_address
    const cellPhone = data?.phone_numbers?.[0]?.phone_number
    const imageUrl = data?.image_url
    const clerkUserId = data?.id

    const dataForRequest = {
      firstName,
      lastName,
      emailAddress,
      cellPhone,
      imageUrl,
      clerkUserId,
    }

    return {
      headers: {
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: JSON.stringify({
        data: dataForRequest,
      }),
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 401,
    }
  }
}
