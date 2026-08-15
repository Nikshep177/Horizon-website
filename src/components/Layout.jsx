import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  )
}
