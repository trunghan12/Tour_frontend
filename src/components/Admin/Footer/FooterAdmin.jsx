import React from "react";
export default function FooterAdmin() {
  const year = new Date().getFullYear();
  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Bản quyền &bản sao; Trang web của bạn {year}</span>
        </div>
      </div>
    </footer>
  );
}
