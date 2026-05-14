import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-6 h-[60px] pc:h-[80px] flex items-center justify-start">
        <a href="/" className="inline-block hover:opacity-80 transition-opacity">
          {/* Desktop/Tablet Logo */}
          <Image 
            src="/images/illustrations/logo-large.png" 
            alt="do it; logo" 
            width={151} 
            height={40} 
            priority 
            className="hidden tablet:block w-auto h-10" 
          />
          {/* Mobile Logo (Cloud only) */}
          <Image 
            src="/images/illustrations/Size=Small.png" 
            alt="logo" 
            width={71} 
            height={40} 
            priority 
            className="block tablet:hidden w-auto h-10" 
          />
        </a>
      </div>
    </header>
  );
}
