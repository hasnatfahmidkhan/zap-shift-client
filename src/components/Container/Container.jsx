
const Container = ({ children, className }) => {
  return (
    <section
      className={`w-full max-w-7xl mx-auto px-4 xl:px-0 py-4 md:py-8 ${className}`}
    >
      {children}
    </section>
  );
};

export default Container;
