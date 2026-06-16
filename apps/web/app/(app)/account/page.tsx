import type { Metadata } from 'next';
import { AccountView } from '@/features/account/AccountView';

export const metadata: Metadata = {
  title: 'Account | ProBotica',
  description: 'Your ProBotica account — profile and quick access to your tools.',
};

export default function AccountPage() {
  return <AccountView />;
}
