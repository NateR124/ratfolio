import { rats } from '@/lib/rats';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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

      {/* Back button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-10 text-white/60 hover:text-white transition-colors text-sm"
      >
        &larr; Back
      </Link>

      {/* Name + description overlay at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-8 py-10">
        <h1 className="text-4xl font-serif font-bold text-amber-400 mb-2">{rat.name}</h1>
        <p className="text-neutral-300 text-lg font-light max-w-2xl">{rat.description}</p>
      </div>
    </div>
  );
}
