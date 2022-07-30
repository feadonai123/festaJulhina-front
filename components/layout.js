import HeadComponent from './head'
import FooterComponent from './footer'
import HeaderComponent from './header'

export default function Layout ({ children }) {
  return <>
    <HeadComponent />

    <HeaderComponent />

    <main>
      {children}
    </main>

    <FooterComponent />
  </>

}