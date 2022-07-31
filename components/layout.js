import HeadComponent from './head'

export default function Layout ({ children }) {
  return <>
    <HeadComponent />
    <main>
      {children}
    </main>
  </>

}