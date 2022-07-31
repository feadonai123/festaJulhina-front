import Layout from '../components/layout'
import { ProductsProvider } from '../hooks/products'
import { CategoriesProvider } from '../hooks/categories'
import { CarrinhoProvider } from '../hooks/carrinho'
import { UserProvider } from '../hooks/user'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<ProductsProvider>
      <UserProvider>
        <CategoriesProvider>
          <CarrinhoProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CarrinhoProvider>
        </CategoriesProvider>
      </UserProvider>
  </ProductsProvider>)
}

export default MyApp
