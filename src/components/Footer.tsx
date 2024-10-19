interface FooterProps {
  color?: string;
}

const Footer: React.FC<FooterProps> = ({ color }) => {
  return (
    <footer style={{ backgroundColor: color }} className="text-white w-full">
      {/* Basic footer with copyright information and social media links */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-center font-['Outfit']">
          © Copyright {new Date().getFullYear()} Prevention Connect, All Rights
          Reserved.
        </p>
        <div className="flex space-x-5">
          <a href="" className=" relative group">
            Contact Us
            <span className="block h-0.5 bg-myoffwhite scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
            className="relative group"
          >
            YouTube
            <span className="block h-0.5 bg-myoffwhite scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
            className="relative group"
          >
            Instagram
            <span className="block h-0.5 bg-myoffwhite scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
          <a
            href=""
            target="_blank"
            rel="noreferrer"
            className="relative group"
          >
            Facebook
            <span className="block h-0.5 bg-myoffwhite scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
