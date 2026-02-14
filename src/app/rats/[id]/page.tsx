import { rats } from '@/lib/rats';
import AudioPlayer from '@/components/AudioPlayer';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return rats.map((rat) => ({
    id: rat.id,
  }));
}

export default function RatPage({ params }: { params: { id: string } }) {
  const rat = rats.find((r) => r.id === params.id);

  if (!rat) {
    notFound();
  }

  // Placeholder image for the rat detail
  const ratImage = `https://placehold.co/600x800/1a1a1a/FFF.png?text=${encodeURIComponent(rat.name)}`;

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-8">
      <AudioPlayer src={rat.audioPath} />
      
      <Link href="/" className="absolute top-8 left-8 text-neutral-400 hover:text-white transition-colors">
        &larr; Back to Scene
      </Link>
      
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-2xl border border-neutral-800">
           <Image
            src={ratImage}
            alt={rat.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="space-y-6">
          <h1 className="text-5xl font-serif font-bold tracking-tight text-amber-500">
            {rat.name}
          </h1>
          <p className="text-xl text-neutral-300 leading-relaxed font-light">
            {rat.description}
          </p>
        </div>
      </div>
    </div>
  );
}
