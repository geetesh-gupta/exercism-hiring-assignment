import TestimonialsPage from "./pages/TestimonialPage";

function App() {
  return (
    <div className="text-center flex flex-col items-center">
      <header className="bg-[#282c34] h-20 w-full flex flex-col items-center justify-center text-3xl text-white">
        <a
          className="text-[#61dafb]"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Header TODO
        </a>
      </header>
      <TestimonialsPage />
    </div>
  );
}

export default App;
