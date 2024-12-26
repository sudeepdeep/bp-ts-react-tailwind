import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import Helmet from "./components/Helmet";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <ToastContainer />
    <Helmet
      appTitle="HOME | UNILINKS"
      favicon={
        "https://firebasestorage.googleapis.com/v0/b/woid-582b2.appspot.com/o/snapnews.png?alt=media&token=ecf9f9ce-cc18-4035-8f44-ba7339640204"
      }
      description="UniLinks is the ultimate solution for managing your digital identity. With one personalized link, you can share all your social media profiles, websites, and online connections seamlessly. Perfect for influencers, professionals, and individuals, LinkConnect simplifies how you connect online. Build your unique profile and make it easier for others to find and follow you across multiple platforms. Start creating your all-in-one social media hub today and never miss an opportunity to grow your online presence."
    />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>
);
