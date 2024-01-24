const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-white">
          &copy; {new Date().getFullYear()} ReData. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
