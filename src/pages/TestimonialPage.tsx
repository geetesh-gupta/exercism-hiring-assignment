import TestimonialsContainer from "../components/TestimonialsContainer";

function TestimonialsPage() {
  return (
    <div className="flex flex-col items-center text-center text-default bg-default">
      <p>{"Testimonials I've left"}</p>
      <TestimonialsContainer />
    </div>
  );
}

export default TestimonialsPage;
