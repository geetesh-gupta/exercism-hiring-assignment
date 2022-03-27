import TestimonialsContainer from "../components/TestimonialsContainer";
import Icon, { IconSizes } from "../elements/Icon";
import testimonialsLogo from "../assets/images/testimonials.svg";
import testimonialsStripe from "../assets/images/testimonialsStripe.svg";

function TestimonialsPage() {
  return (
    <div className="flex w-full flex-col items-center bg-default text-center text-default">
      <div className="mt-10 flex flex-col items-center gap-3">
        <Icon
          size={IconSizes.lg}
          src={testimonialsLogo}
          alt="Testimonials Logo"
        />
        <h1 className="text-h1 font-bold leading-h1 text-labelDefault">
          {"Testimonials I've left"}
        </h1>
        <Icon
          size={IconSizes.xl}
          src={testimonialsStripe}
          alt="Testimonials Stripe"
        />
      </div>
      <TestimonialsContainer />
    </div>
  );
}

export default TestimonialsPage;
