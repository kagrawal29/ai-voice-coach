import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to the login page
  redirect('/auth/login');
  
  // This part will never be rendered due to the redirect
  return null;
}
