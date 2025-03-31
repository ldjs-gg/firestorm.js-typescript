# Firestorm.js

A modern SaaS starter template with Next.js, Firebase, and Stripe integration.

## Features

- 🔐 Google Authentication
- 💳 Stripe Payments Integration
- 🌙 Dark Mode Support
- 📱 Responsive Design
- 🔒 Protected Routes
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast Performance with Next.js

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git
- Firebase account
- Stripe account
- Run Payments account

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/firestorm.js.git
cd firestorm.js
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup wizard
3. Enable Google Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google as a sign-in provider
   - Configure OAuth consent screen if needed

4. Set up Firestore Database:
   - Go to Firestore Database
   - Click "Create Database"
   - Choose "Start in production mode"
   - Select a location closest to your users

5. Get Firebase Configuration:
   - Go to Project Settings
   - Under "Your apps", click the web icon (</>)
   - Register your app with a nickname
   - Copy the Firebase configuration object

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Run Payments Configuration
RUN_PAYMENTS_API_KEY=your_run_payments_api_key
```

### 5. Set Up Firestore Rules

1. Go to Firestore Database > Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Premium subscriptions
    match /subscriptions/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if false; // Only allow writes through backend
    }
  }
}
```

### 6. Set Up Stripe

1. Create a [Stripe Account](https://dashboard.stripe.com/register)
2. Get your API keys from Stripe Dashboard > Developers > API keys
3. Create a product and price in Stripe Dashboard:
   - Go to Products > Add Product
   - Set up your pricing tiers
   - Note down the price IDs for your environment variables

### 7. Set Up Run Payments

1. Create a [Run Payments Account](https://runpayments.com)
2. Get your API key from the dashboard
3. Configure your webhook endpoint:
   - Go to Webhooks > Add Endpoint
   - Set the endpoint URL to: `https://your-domain.com/api/webhooks/run-payments`
   - Select events to listen for (at minimum: `payment.succeeded`, `payment.failed`)

### 8. Deploy Firebase Functions

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Functions
firebase init functions

# Deploy functions
firebase deploy --only functions
```

### 9. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

### 10. Create Your First User

1. Click "Get started for free" on the landing page
2. Sign in with your Google account
3. You'll be redirected to the dashboard
4. Your user profile will be automatically created in Firestore

## Project Structure

```
firestorm.js/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (application)/     # Protected application routes
│   │   └── (marketing-site)/  # Public marketing pages
│   ├── components/            # Shared components
│   └── lib/                   # Utility functions
├── public/                    # Static assets
└── functions/                 # Firebase Cloud Functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting platform (Vercel recommended for Next.js):
```bash
npm run start
```

## Troubleshooting

### Common Issues

1. **Firebase Initialization Error**
   - Check if all environment variables are correctly set
   - Verify Firebase project configuration

2. **Stripe Payment Issues**
   - Ensure webhook endpoints are correctly configured
   - Check Stripe API keys and webhook secrets

3. **Authentication Problems**
   - Verify Google OAuth configuration
   - Check Firebase Authentication settings

### Getting Help

- [Firebase Documentation](https://firebase.google.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Run Payments Documentation](https://docs.runpayments.com)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.