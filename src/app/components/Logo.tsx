import { Poppins, Fredoka } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fredoka',
});

const MapPinIcon = () => (
  <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path 
      fillRule="evenodd" 
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
      clipRule="evenodd" 
    />
  </svg>
);

export default function Logo() {
  return (
    <div className="flex cursor-pointer" title="WHERE'S OBEE Home">
      <span className={`${poppins.className} font-bold text-gray-700 tracking-wide items-center`}>
        WHERE'S
      </span>
      <span className={`${fredoka.className} text-teal-600 flex items-center`}>
        <MapPinIcon />
        <span>BEE</span>
      </span>
    </div>
  );
}