import { rats } from '@/lib/rats';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackNav from '@/components/BackNav';
import { SHOW_TEXT } from '@/lib/theme';

export function generateStaticParams() {
  return rats.map((rat) => ({
    id: rat.id,
  }));
}

export default async function RatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rat = rats.find((r) => r.id === id);

  if (!rat) {
    notFound();
  }

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <Image
        src={rat.imagePath}
        alt={rat.name}
        fill
        className="object-contain"
        priority
      />

      <BackNav />

      {/* Name + description overlay at the bottom */}
      {SHOW_TEXT && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-8 py-10">
          <h1 className="text-4xl font-serif font-bold text-amber-400 mb-2">{rat.name}</h1>
          <p className="text-neutral-300 text-lg font-light max-w-2xl">{rat.description}</p>
        </div>
      )}
    </div>
  );
}
