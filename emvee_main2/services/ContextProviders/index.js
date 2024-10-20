import { StoreDetailsProvider } from "../StoreDetails/StoreDetailsContext";

export default function ContextProviders({ children }) {
  return <StoreDetailsProvider>{children}</StoreDetailsProvider>;
}
