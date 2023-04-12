import { type NextPage } from "next";

import Container from "@/components/Container";
import { BsArrowRight } from "react-icons/bs";
import { api } from "@/utils/api";
import Toast from "@/components/Toast";
import toast from "react-hot-toast";

const About: NextPage = () => {
  const { mutateAsync: addSubscription } =
    api.database.addSubscription.useMutation();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    (async () => {
      await addSubscription({
        email: data.email as string,
      })
        .then((data) => {
          if ((data as string).includes("Error")) {
            toast.custom((t) => (
              <div className={t.visible ? "animate-enter" : "animate-leave"}>
                <Toast
                  title="Error"
                  message="Duplicate email address."
                  type="error"
                />
              </div>
            ));
          } else {
            toast.custom((t) => (
              <div className={t.visible ? "animate-enter" : "animate-leave"}>
                <Toast
                  title="Subscribed!"
                  message="You have subscribed successfully."
                  type="success"
                />
              </div>
            ));
          }
        })
        .catch((e) => {
          toast.custom((t) => (
            <div className={t.visible ? "animate-enter" : "animate-leave"}>
              <Toast
                title="Error"
                message="An error occurred while subscribing."
                type="error"
              />
            </div>
          ));

          console.error(e);
        });
    })().catch((e) => {
      console.error(e);
    });
  }

  return (
    <Container>
      <section id="about">
        <span className="about-overlay absolute z-0 min-h-screen w-full" />
        <div className="relative z-10  flex min-h-screen items-end p-2 md:h-[1024px] md:p-[35px] lg:p-[50px]">
          <span className="flex flex-col items-start text-white">
            <span className="flex flex-col items-start px-3.5 md:px-0">
              <h1 className="mt-[140px] text-5xl font-semibold md:mt-20 lg:text-6xl">
                About Us
                <span className="color-primary">.</span>
              </h1>
              <h3 className="mb-2.5 mt-[30px] text-[25px] font-semibold leading-7 md:mb-5 md:mt-10">
                The natural world is at the heart of our work on robots.
              </h3>
            </span>
            <p className="bg-[#010E1C]/40 p-3.5 text-base leading-snug lg:bg-transparent lg:p-0">
              We started from books on ornithology, hours of observations, basic
              prototypes and now we mimic certain types of birds. Talented
              fliers inspired us and talented people in our team instill an
              unshakable sense of optimism each day. Optimism that with
              cutting-edge technology, the future can be better and more secure.{" "}
              <br />
              <br />
              Wrona Robotics is more than just a company. We are creating a wave
              of change as we master innovation through high-tech products, push
              boundaries, and simplify the complex. We focus on empowering
              everyday users and making a difference in our customers’ lives.{" "}
              <br />
              <br /> Our experts in software and complex technologies work
              around the clock to provide cutting-edge, easy-to-use products
              that are of high value to the customer. <br />
              <br /> Technology should empower humanity, not overwhelm it. With
              this in mind, we are revolutionizing how we interact with
              technology to create a better future for all. <br />
              <br />
              Join us as we build a better future, one innovation at a time.
            </p>

            {/* Call to action */}
            <div className="mb-4 mt-5 flex w-full flex-col items-center justify-between px-3.5 md:mt-14 lg:mt-0 lg:mt-[93px] lg:flex-row">
              <h2 className="mr-auto w-[75%] text-[39px] font-semibold leading-tight md:w-full lg:mr-5">
                Want to be part of our flock?
              </h2>
              <form
                className="mt-10 flex w-full flex-col items-center justify-center space-y-4 md:justify-end lg:mt-0 lg:flex-row lg:space-x-5 lg:space-y-0"
                onSubmit={handleSubmit}
              >
                <input
                  required
                  name="email"
                  type="email"
                  className="primary-input w-full lg:w-[372px] xl:w-[472px]"
                  placeholder="Enter email address..."
                />
                <button
                  className="primary-button flex w-full flex-row items-center justify-center gap-3 text-lg lg:w-[187px] xl:w-[287px]"
                  type="submit"
                >
                  Subscribe <BsArrowRight />
                </button>
              </form>
            </div>
          </span>
        </div>
      </section>
    </Container>
  );
};

export default About;
