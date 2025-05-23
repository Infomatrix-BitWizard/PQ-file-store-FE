"use client";

export default function Layout({ children }: any) {
  return (
    <html>
        <body>
              <div className="flex flex-col grow">{children}</div>

              <div id="modal-root" />
        </body>
    </html>
  );
}
