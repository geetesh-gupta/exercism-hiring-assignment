import Navbar from "./components/Navbar";
import TestimonialsPage from "./pages/TestimonialPage";

function App() {
  return (
    <div className="flex w-full flex-col items-center bg-default text-center text-default">
      <Navbar />
      <TestimonialsPage />
    </div>
  );
}

export default App;
