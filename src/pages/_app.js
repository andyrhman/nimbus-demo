import Layout from '../components/Layout';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { configStore } from '../redux/configureStore';
import { Provider } from 'react-redux';
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';


axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
axios.defaults.withCredentials = true;

const store = configStore();

function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Provider store={store}>
        <ToastContainer />
        <Component {...pageProps} />
      </Provider>
    </Layout>
  );
}

export default MyApp;