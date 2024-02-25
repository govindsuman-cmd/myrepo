import React from 'react';
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className='static overflow-y-auto overflow-x-hidden'> 
       <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />

        {children}
      </main>
      <div  className='absolute bottom-0 w-full '>
      <Footer />
      </div>
    </div>
  )
}

Layout.defaultProps = {
    title: "Refer Now",
    description: "This is a talent hiring platform",
    keywords: "tech,job search,job,hiring",
    author: "Govind Suman",
  };

export default Layout
