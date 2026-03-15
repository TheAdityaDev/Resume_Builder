import React from "react";

const Footer = () => {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-14">
          <a href="#">
            <img
              src="/src/assets/logo.svg"
              alt="logo"
              className="h-11 w-auto"
            />
          </a>

          <div className="flex flex-col lg:items-center lg:justify-center">
            <div className="flex flex-col text-sm space-y-2.5">
              <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
              <a className="hover:text-slate-600 transition" href="#">
                About us
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Careers
                <span className="text-xs text-white bg-indigo-600 rounded-md ml-2 px-2 py-1">
                  We’re hiring!
                </span>
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Contact us
              </a>
              <a className="hover:text-slate-600 transition" href="#">
                Privacy policy
              </a>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-gray-800 mb-5">
              Subscribe to our newsletter
            </h2>
            <div className="text-sm space-y-6 max-w-sm">
              <p>
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex items-center justify-center gap-2 p-2 rounded-md bg-indigo-50">
                <input
                  className="focus:ring-2 bg-white ring-indigo-600 outline-none w-full max-w-64 py-2 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-indigo-600 px-4 py-2 text-white rounded">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-col max-md:items-center max-md:text-center gap-2 items-end">
            <p class="max-w-60">
              Making every customer feel valued—no matter the size of your
              audience.
            </p>
            <div class="flex items-center gap-4 mt-3">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-dribbble size-5 hover:text-indigo-500"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path>
                  <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path>
                  <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72"></path>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-linkedin size-5 hover:text-indigo-500"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-twitter size-5 hover:text-indigo-500"
                  aria-hidden="true"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-youtube size-6 hover:text-indigo-500"
                  aria-hidden="true"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
          
        <p className="py-4 text-center border-t mt-6 border-slate-200">
          Copyright 2025 © <a href="#">AI-powered Resume Builder,</a> All Right
          Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
