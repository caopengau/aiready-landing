import { auth } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getUserByEmail, createUser } from '@/lib/db';
import SettingsClient from './SettingsClient';

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect('/login');
  }

  let user;
  try {
    user = await getUserByEmail(session.user.email);
    if (!user) {
      user = await createUser({
        id: session.user.id,
        email: session.user.email,
        name: session.user.name || undefined,
        image: session.user.image || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Settings page error:', error);
    user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    };
  }

  return (
    <SettingsClient
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        githubId: user.githubId,
        googleId: user.googleId,
      }}
    />
  );
}
