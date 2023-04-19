import { type NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Preorder from "@/components/forms/Preorder";



const Home: NextPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);
  const [isFirefox, setIsFirefox] = useState(false);



  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50,
        behavior: 'smooth'
      });
    }
  };

  const features = [
    {
      title: "Autonomous security is possible",
      description: (
        <p className="text-base leading-6 tracking-[0.1px]">
          ENERI combines nature and technology into a modern, versatile IoT
          device. Our security device is designed like a crow with robotic claws
          and legs for easy takeoff and landing. We installed a durable,
          high-quality camera in the head of the bird to give you an{" "}
          <strong>eagle-eye view of your business or home.</strong> <br /> <br />{" "}
          Not only does ENERI provide security and peace of mind, but it’s also a
          great way to keep children entertained as they fly it around the
          backyard, soaring and exploring.
        </p>
      ),
    },
    {
      title: "It’s a bird; it’s a plane… it’s ENERI",
      description: (
        <p className="text-base leading-6 tracking-[0.1px]">
          In autopilot mode, ENERI flies on its own, patrolling your property
          while you relax. Autopilot assistance provides security and convenience,
          taking the hassle out of personal protection. <br />
          <br />{" "}
          <strong>You can turn autopilot off and fly the device manually.</strong>
        </p>
      ),
    },
    {
      title: "With ENERI, the possibilities are endless",
      description: (
        <p className="text-base leading-6 tracking-[0.1px]">
          ENERI is made with only the highest-quality materials for a product that
          will last through the years. We guarantee our product is as durable as
          it is safe and secure. Even your children can operate ENERI without
          damaging it.<br /> <br /> Outdated security protocols cost you time, money, and peace
          of mind. <br /> <br />
          <strong>
          
            <span onClick={(e) =>(scrollTo(e, 'preOrder'))} className="text-blue-500 underline cursor-pointer">
              Upgrade
            </span>
          
            {" "}
            with ENERI and experience the future at your fingertips.
          </strong>
        </p>
      ),
    },
  ];
  // useEffect(() => {
  //   setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  //   if (window !== undefined) {
  //     setIsFirefox(navigator.userAgent.indexOf("Firefox") !== -1);
  //   }
  // }, []);



  useEffect(() => {
    const videoElement = document.getElementById("vid") as HTMLVideoElement;
    videoElement.setAttribute("playsinline", "true");

    if (videoElement) {
      videoElement.play().catch((error) => {
        // Handle any errors that may occur during video playback
        console.error("Failed to play video:", error);

        /* Display fallback image */
        const imgElement = document.getElementById("img") as HTMLImageElement;
        imgElement.classList.remove("hidden");
      });
    }
  }, []);

  const closeModal: () => void = () => {
    setIsPreorderOpen(false);
  };

  // Dialogue
  // function openDialog() {
  //   setIsPreorderOpen(true);
  // }

  // function closeDialog() {
  //   setIsPreorderOpen(false);
  // }

  // useEffect(() => {
  //   const body = document.body;
  //   const dialog = document.getElementById("my-dialog");

  //   function handleOpen() {
  //     body.classList.add("dialog-open");
  //     body.classList.remove("dialog-closed");
  //   }

  //   function handleClose() {
  //     body.classList.remove("dialog-open");
  //     body.classList.add("dialog-closed");
  //   }

  //   dialog?.addEventListener("open", handleOpen);
  //   dialog?.addEventListener("close", handleClose);

  //   return () => {
  //     dialog?.removeEventListener("open", handleOpen);
  //     dialog?.removeEventListener("close", handleClose);
  //   };
  // }, []);

  return (
    <>
      <Container>
        <div className="relative overflow-hidden">
          <section className="relative overflow-hidden">
            <video
              id="vid"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                width: "100%",
                minWidth: "100%",
                maxWidth: "100%",
                height: "100%",
                minHeight: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
              className="absolute left-0 top-0 z-[-1] h-full w-full object-cover object-[35%] lg:object-[20%] xl:object-center"
            >
              <source src="/static/assets/bg-hero-4mb.mp4" type="video/mp4" />
            </video>

            {/* Fallback image */}
            <img
              id="img"
              className="absolute left-0 top-0 z-[-1] hidden h-full w-full object-cover object-[35%] lg:object-[20%] xl:object-center"
              src="/static/assets/hero-bg.webp"
              alt="Flying Robotics"
            />

            <div
              className={cn(
                "flex h-full items-end px-[22px] py-[58px] lg:px-[50px] lg:py-[70px]",
                isMobile ? "max-[527px]:h-[calc(100vh-56px)]" : "h-screen",
                isMobile && isFirefox && "h-screen"
              )}
            >
              <span className="flex flex-col items-start space-y-6 mb-6">
                <h1 className="text-6xl font-semibold text-white lg:leading-[4.438rem]">
                  Flying <br /> Robotics
                  <span className="color-primary">.</span>
                </h1>
                <a href="#about" >
                  <button className="border-primary color-primary flex h-[50px] w-[50px] items-center justify-center rounded-full border transition-all duration-300 ease-in-out arrowDButton focus:bg-[#0caf7b]">
                    <AiOutlineArrowDown className="text-xl" />
                  </button>
                </a>
              </span>
            </div>
          </section>

          <section id="about">
            <div className="flex flex-col items-start bg-white pt-[62px] md:p-[35px] lg:space-y-10 lg:px-[50px] lg:pb-[53px] lg:pt-[32px] xl:space-y-6 xl:pb-[59px] xl:pt-[39px]">
              <h2 className="mx-[22px] text-4xl font-semibold md:mx-0 lg:text-5xl">
                Our Robotic Bird –{" "}
                <span className="color-secondary uppercase">Eneri</span>
              </h2>
              <div className="grid md:gap-2 lg:grid-cols-3 xl:gap-5">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="card-shadow flex flex-col py-11 md:py-0"
                  >
                    <span className="bg-primary mt-0 flex h-8 w-14 items-center justify-end rounded-r-2xl pr-[10px] text-lg font-extrabold md:mt-[22px]">
                      0{index + 1}
                    </span>
                    <div className="flex flex-col items-start space-y-5 px-[25px] py-[17px]">
                      <h3 className="text-[25px] font-semibold leading-none">
                        {feature.title}
                      </h3>
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="preOrder">
            <div className="flex  h-[898px] w-full flex-col bg-[#ECECEC] px-[22px] py-[70px] md:h-[573px] md:justify-center md:px-[35px] md:py-0 lg:px-[50px] xl:h-[400px]">
              <span className="flex flex-col gap-y-5 md:w-3/4 md:items-start lg:w-full ">
                <h3 className="color-secondary text-[39px] font-semibold leading-[46px] tracking-[0.1px] md:text-3xl md:leading-none lg:text-[39px]">
                  New Security Protocol
                </h3>
                <p className="text-base lg:max-w-[57%]">
                  Keeping an eye on hard-to-see areas in your business or home
                  doesn’t have to be challenging. In fact, keeping your family
                  secure with ENERI can be interactive, entertaining, and fun.
                </p>
                <button
                  type="button"
                  className="primary-button mt-5 flex flex-row items-center justify-center gap-3 text-lg md:justify-start"
                  onClick={() => {
                    console.log('YES');
                  //   // event.preventDefault();
                  //   // var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                  //   // event.stopPropagation();
                    setIsPreorderOpen(true);
                  //   // console.log(scrollPosition);
                  //   // document.body.style.position = 'fixed';
                  //   // document.body.style.top = `-${scrollPosition}px`;
                  }}
                  // onClick={openDialog}
                >
                  Pre-Order Now <BsArrowRight />
                </button>
                {/* <Preorder
                isOpen={isPreorderOpen}
                setIsOpen={setIsPreorderOpen}
                closeModal={() => setIsPreorderOpen(false)}
              /> */}
              </span>
            </div>
          </section>

          {/* Absolute positioned image of a bird */}
          <Image
            src="/static/assets/bird.svg"
            alt="Bird"
            className="absolute bottom-[12%] right-[-32%] h-[700px] w-[818px] max-w-fit md:bottom-40 md:right-[-18%]  md:h-[700px] md:w-[900px] lg:bottom-52 lg:right-[-10%] lg:h-[885px] lg:w-[1332px] xl:bottom-24 xl:right-10 xl:h-[900px] xl:w-[1200px]"
            width={1200}
            height={1200}
          />
          <footer className="footer bg-primary">
            <div className="footer-overlay flex h-[650px]  flex-col items-start justify-end px-[22px] py-7 md:h-auto md:px-[50px] md:pb-[25px] md:pt-11">
              <Image
                src="/static/assets/logo-black.svg"
                alt="Logo"
                width={400}
                height={89}
                className="h-[89px]"
              />
              <h3 className="mb-[50px] mt-[50px] text-6xl font-semibold  lg:mb-[140px] lg:mt-[170px] xl:mb-[102px] xl:mt-[69px]">
                <span className="text-white">
                  Flying <br /> Robotics
                </span>
                .
              </h3>
              <span className="flex flex-col space-y-[30px]">
                <span className="flex flex-row items-center space-x-5">
                  <Link
                    href="https://facebook.com/groups/wronarobotics"
                    className="flex h-10 w-10 items-end justify-center rounded-full "
                  >
                    <Image
                      src="/static/assets/facebook.svg"
                      width={40}
                      height={40}
                      alt="Facebook logo"
                    />
                  </Link>
                  <Link
                    href="https://instagram.com/wrona.robotics"
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                  >
                    <Image
                      src="/static/assets/insta.svg"
                      width={40}
                      height={40}
                      alt="Instagram logo"
                    />
                  </Link>
                  <Link
                    href="https://twitter.com/WronaRobotics"
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                  >
                    <Image
                      src="/static/assets/twitter.svg"
                      width={40}
                      height={40}
                      alt="Twitter logo"
                    />
                  </Link>
                </span>

                {/* Copyright */}
                <span className="text-base">
                  © {new Date().getFullYear()} Wrona Robotics. All rights
                  reserved.
                </span>
              </span>
            </div>
          </footer>
        </div>
      </Container>
      <Preorder
        isOpen={isPreorderOpen}
        setIsOpen={setIsPreorderOpen}
        closeModal={closeModal}
      />
      <style jsx global>{`
        html {
          overflow-y: ${isPreorderOpen ? "hidden" : "auto"};
          scrollbar-width: ${isPreorderOpen ? "none" : "unset"};
          -ms-overflow-style: ${isPreorderOpen ? "none" : "unset"};
        }
      `}</style>
    </>
  );
};

export default Home;
