import RatScene from '@/components/RatScene';
import { rats } from '@/lib/rats';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <RatScene rats={rats} />
    </main>
  );
}
