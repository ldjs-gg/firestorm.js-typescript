'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { initFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

export default function Hero() {
  const router = useRouter();
  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // Sign in with Google
  const signIn = async() => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user

    if (user) {
      goToDashboard();
    };
  };

  // Go to dashboard
  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-background relative z-0">
      <div className="w-[472px] md:w-[700px] flex flex-col items-center text-center gap-4 relative z-10">
        <div 
          onClick={signIn} 
          className="flex flex-row items-center gap-2 rounded-full px-2 py-1 shadow-sm cursor-pointer mb-2 bg-accent/10"
        >
          <span className="text-xs">🚀</span>
          <span className="text-foreground text-xs">
            Get your new project setup in minutes
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">
          The <span className="text-orange-600">fastest</span> way to build a <span className="text-orange-600">serverless,</span> full-stack  Next.js <span className="text-orange-600">application.</span>
        </h1>
        <p className="text-muted-foreground w-[472px] text-sm md:text-base">
          Build and ship full-stack applications with the most popular serverless web technologies, all in one place.
        </p>
        <div className="flex flex-row gap-8">
          <Image 
            src="/technologies/nextjs.svg" 
            alt="Next.js Logo" 
            width={32} 
            height={32}
            className="dark:invert" 
          />
          <Image 
            src="/technologies/typescript.svg" 
            alt="Firebase Logo" 
            width={16} 
            height={16} 
          />
          <Image 
            src="/technologies/tailwind-css.svg" 
            alt="Tailwind CSS Logo" 
            width={16} 
            height={16} 
          />
          <Image 
            src="/technologies/firebase.svg" 
            alt="Firebase Logo" 
            width={16} 
            height={16} 
          />
          <Image 
            src="/technologies/stripe.svg" 
            alt="Stripe Logo" 
            width={32} 
            height={32} 
          />
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Button 
            onClick={signIn} 
            className="bg-orange-600 hover:bg-orange-500 cursor-pointer text-white"
          >
            Get started for free
          </Button>
          <p className="text-muted-foreground text-xs">
            No credit card required
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Image 
            src="/ui/down-arrow.svg" 
            alt="Down Arrow" 
            width={32} 
            height={32} 
            className="dark:invert"
          />
        </div>
      </div>
    </div>
  );
}