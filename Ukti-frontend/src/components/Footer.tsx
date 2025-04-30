
function Footer() {
  return (
    <footer className="w-full py-6 bg-[#f9f6f1] border-t border-gray-300">
      <div className="max-w-screen-lg mx-auto px-4 flex flex-wrap justify-center items-center gap-x-4 text-gray-800 text-base text-center">
        {/* Brand & Tagline */}

        {/* Navigation Links */}
        <a href="#" className="hover:underline">
          Help
        </a>
        <a href="#" className="hover:underline">
          Contact
        </a>
        <a href="#" className="hover:underline">
          Our Team
        </a>

        {/* Separator */}
        <span className="mx-2">|</span>

        {/* Socials */}
        <a href="#" className="hover:underline">
          Instagram
        </a>
        <a href="#" className="hover:underline">
          Facebook
        </a>
      </div>
    </footer>
  );
}

export default Footer;
