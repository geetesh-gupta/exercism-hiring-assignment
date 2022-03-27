import { MutableRefObject, useEffect } from "react";

export default function useOnClickOutside(
  ref: MutableRefObject<any>,
  handler: (arg0: any) => void
) {
  useEffect(() => {
    const listener = (event: { target: any }) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
