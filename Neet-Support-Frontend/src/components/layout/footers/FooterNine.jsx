import React from "react";
import Links from "../component/Links";

export default function FooterNine() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="py-30 border-top-light">
          <div className="row items-center justify-between">
            <div className="col-auto">
              <div className="text-13 lh-1">
                © {new Date().getFullYear()} Neet Support. All Right Reserved.
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex items-center flex-wrap x-gap-20">
                  <Links />
                </div>

                <button className="button -md -rounded bg-orange-1 text-white ml-30">
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
