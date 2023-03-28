# LockBox

LockBox is a secure, end-to-end encrypted secret sharing service. It allows you to securely share secrets with other people, without having to worry about your data being compromised.

When you share a secret, the data is encrypted directly on your device, meaning it never leaves your device unencrypted. The encrypted data is then securely stored on our server. The recipient can access the secret by entering the password and decrypting the data on their device. After the secret has been decrypted, it is deleted from our server and can no longer be accessed.

LockBox can be accessed at <https://lockbox.vantezzen.io>.

## Development

1. Clone the repository
2. Run `npm install` to install all dependencies
3. Copy `.env.example` to `.env.local` and fill in the required values
4. LockBox uses a Redis server to store data. If you don't have a Redis server you can run one on Docker using `docker run --name lockbox-redis -p 6389:6379 -d redis`
5. Start the development server using `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### hCaptcha

LockBox has an optional hCaptcha integration. If you want to use it, you need to create a hCaptcha account and create a site. Then, you need to set the `NEXT_PUBLIC_HCAPTCHA_SITEKEY` and `HCAPTCHA_SECRET_KEY` environment variables.

## Deployment

LockBox is deployed to Vercel but you can deploy it to any NextJS-compatible service.

If the app has been deployed to Vercel, `NEXT_PUBLIC_APP_URL` does not need to be set as the Vercel URL will be used instead.

## License

MIT
