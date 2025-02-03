import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  const links = [
    { url: `${process.env.NEXT_PUBLIC_HOST}/`, buttonName: "Home" },
    { url: `${process.env.NEXT_PUBLIC_HOST}/users/viewallusers`, buttonName: "Users" },
    { url: `${process.env.NEXT_PUBLIC_HOST}/users/adduser`, buttonName: "Add User" },
    { url: `${process.env.NEXT_PUBLIC_HOST}/userrole/viewallrole`, buttonName: "Roles" },
    { url: `${process.env.NEXT_PUBLIC_HOST}/userrole/addrole`, buttonName: "Add Role" },
  ];

  return (
    <Html lang="en">
      <Head />
      <body>
      <div>
        {links.map((link, index) => (
          <a key={index} href={link.url} rel="noopener noreferrer">
            <button className="btn ">{link.buttonName}</button>
          </a>
        ))}
      </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
