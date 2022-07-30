import Layout from '../components/layout'
import { ProductsProvider } from '../hooks/products'
import { CategoriesProvider } from '../hooks/categories'
import { CarrinhoProvider } from '../hooks/carrinho'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (<ProductsProvider>
      <CategoriesProvider>
        <CarrinhoProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CarrinhoProvider>
      </CategoriesProvider>
  </ProductsProvider>)
}

export default MyApp
